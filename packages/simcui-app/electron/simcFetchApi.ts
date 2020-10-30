import { App, ipcMain } from 'electron';
import fs from 'fs';
import path from 'path';
import cproc from 'child_process';

const RE_SIM_PERCENTAGE = /\]\s(?<min>\d+)\/(?<max>\d+)\s/;

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
    const [simGUID, simTCI] = args;
    const eventChannel = `sim-status/${simGUID}`;

    try {
      const execFullPath = path.resolve(__dirname, '..', 'internals/bin/simc');
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

  ipcMain.on('exec-status', (event) => {
    try {
      const execFullPath = path.resolve(__dirname, '..', 'internals/bin/simc');
      const fileExists = fs.existsSync(execFullPath);
      event.returnValue = { data: fileExists, error: null };
    } catch (e) {
      event.returnValue = { data: null, error: e.message ?? e };
    }
  });
}
