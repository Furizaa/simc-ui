import { ipcRenderer, IpcRendererEvent } from 'electron';
import { useEffect, useState } from 'react';
import { NativeDownloadEventData, NativeEventReturnValue } from '../../../types';

export default function useExecutableDownloader(executableGUID: string) {
  const [returnValue, setReturnValue] = useState<NativeEventReturnValue<NativeDownloadEventData>>({
    data: null,
    error: null,
  });

  const returnEventChannel = `exec-download-status/${executableGUID}`;

  const statusUpdateListener = (_: IpcRendererEvent, arg: NativeEventReturnValue<NativeDownloadEventData>) => {
    setReturnValue(arg);
  };

  useEffect(() => {
    ipcRenderer.on(returnEventChannel, statusUpdateListener);
    return () => {
      ipcRenderer.off(returnEventChannel, statusUpdateListener);
    };
  }, []);

  const initiateDownload = () => {
    ipcRenderer.send('exec-download', [executableGUID]);
  };

  return { initiateDownload, data: returnValue.data, error: returnValue.error };
}
