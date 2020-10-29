import { App, ipcMain } from 'electron';
import fs from 'fs';
import http from 'http';
import path from 'path';
import pify from 'pify';
import dmg from 'dmg';
import { memoize } from 'lodash';
import cproc from 'child_process';
import executablesData from '../modules/data/executables';
import { NativeDownloadEventData } from '../types';

const RE_SIM_PERCENTAGE = /\]\s(?<min>\d+)\/(?<max>\d+)\s/;

const getPlatformPackExtension = () => {
  if (process.platform === 'darwin') {
    return 'dmg';
  }
  return '7z';
};

const findExecutableOptions = (executableGuid: string) => {
  const execData = executablesData.find((item) => item.guid === executableGuid);
  if (!execData) {
    throw new Error(`Exectable GUID ${executableGuid} doesn't exist.`);
  }
  return execData;
};

const downloadExecutable = (
  sourceUrl: string,
  targetFilePath: string,
  onStatus: (status: NativeDownloadEventData) => void,
) => {
  return new Promise((resolve, reject) => {
    const fileHandle = fs.createWriteStream(targetFilePath);
    const sendPercentageUpdate = memoize((percentage: number) => {
      onStatus({ stage: 'downloading', percentage });
    });

    http
      .get(sourceUrl, (response) => {
        const contentLength = parseInt(response.headers['content-length'] ?? '0', 10);
        let contentLengthDownloaded = 0;

        response.on('data', (chunk) => {
          contentLengthDownloaded += chunk.length;
          sendPercentageUpdate(Math.round((10 * contentLengthDownloaded) / contentLength) * 10);
        });

        response.pipe(fileHandle);
        fileHandle.on('finish', () => {
          fileHandle.close();
          sendPercentageUpdate(100);
          resolve();
        });
      })
      .on('error', (message) => {
        reject(message);
      });
  });
};

const parseSimOutputPercentage = (out: string) => {
  const match = RE_SIM_PERCENTAGE.exec(out);
  if (match) {
    const min = parseInt(match?.groups?.min ?? '0', 10) ?? 0;
    const max = parseInt(match?.groups?.max ?? '100', 10) ?? 0;
    return Math.min(100, Math.max(0, Math.round((100 * min) / max)));
  }
  return null;
};

export default function instrument(app: App) {
  const userDataPath = app.getPath('userData');

  ipcMain.on('sim', (event, args) => {
    const [execGUID, simGUID, simTCI] = args;
    const eventChannel = `sim-status/${simGUID}`;

    try {
      const execData = findExecutableOptions(execGUID);
      const execFullPath = path.resolve(userDataPath, `${execData.semver}-${execData.target}`);
      const outputFullPath = path.resolve(userDataPath, `${simGUID}.json`);
      const simTCIFullPath = path.resolve(userDataPath, `${simGUID}.simc`);

      if (!fs.existsSync(execFullPath)) {
        event.reply({ data: null, error: "Executable doesn't exist" });
      }

      fs.writeFileSync(simTCIFullPath, simTCI);

      const simProc = cproc.execFile(execFullPath, [simTCIFullPath, `json2=${outputFullPath}`], (error) => {
        if (error) {
          event.reply(eventChannel, { data: null, error: `Error Calling SimC: "${error}"` });
        }
      });

      simProc.stdout?.on('data', (stdout) => {
        const percentage = parseSimOutputPercentage(stdout);
        if (percentage) {
          event.reply(eventChannel, { data: { stage: 'running', percentage }, error: null });
        }
      });

      simProc.on('close', () => {
        fs.unlinkSync(simTCIFullPath);
        try {
          const simResult = fs.readFileSync(outputFullPath, { encoding: 'UTF-8' });
          event.reply(eventChannel, { data: { stage: 'done', output: simResult }, error: null });
        } catch (e) {
          event.reply(eventChannel, { data: null, error: "Simulation didn't finish properly." });
        }
      });
    } catch (e) {
      event.reply(eventChannel, { data: null, error: e.message ?? e });
    }
  });

  ipcMain.on('exec-status', (event, args) => {
    try {
      const [execGUID] = args;
      const execData = findExecutableOptions(execGUID);
      const execFullPath = path.resolve(userDataPath, `${execData.semver}-${execData.target}`);
      const fileExists = fs.existsSync(execFullPath);
      event.returnValue = { data: fileExists, error: null };
    } catch (e) {
      event.returnValue = { data: null, error: e.message ?? e };
    }
  });

  ipcMain.on('exec-download', async (event, args) => {
    const [execGUID] = args;
    const eventChannel = `exec-download-status/${execGUID}`;
    try {
      const execData = findExecutableOptions(execGUID);
      const execFullPath = path.resolve(userDataPath, `${execData.semver}-${execData.target}`);
      const packFullPath = `${execFullPath}.${getPlatformPackExtension()}`;

      await downloadExecutable(execData.url, packFullPath, (downloadEvent) =>
        event.reply(eventChannel, {
          data: downloadEvent,
          error: null,
        }),
      );

      event.reply(eventChannel, {
        data: { stage: 'unpacking' },
        error: null,
      });

      if (process.platform === 'darwin') {
        const dmgAsync = pify(dmg);
        try {
          const mountedPath = await dmgAsync.mount(packFullPath);
          const executableToExtract = path.resolve(mountedPath, 'simc');
          fs.copyFileSync(executableToExtract, execFullPath);
          await dmgAsync.unmount(mountedPath);

          event.reply(eventChannel, {
            data: { stage: 'done' },
            error: null,
          });
        } catch (e) {
          event.reply(eventChannel, {
            data: null,
            error: `Unable to mount dmg: ${e.message ?? e}`,
          });
        }
      }
    } catch (e) {
      event.reply(eventChannel, { data: null, error: e.message ?? e });
    }
  });
}
