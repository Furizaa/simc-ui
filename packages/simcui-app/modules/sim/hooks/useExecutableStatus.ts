import { ipcRenderer } from 'electron';
import { useEffect, useState } from 'react';
import { NativeEventReturnValue } from '../../../types';

export default function useExecutableStatus(executableGUID: string) {
  const [returnValue, setReturnValue] = useState<NativeEventReturnValue<boolean>>({
    data: null,
    error: null,
  });

  useEffect(() => {
    const ipcResult = ipcRenderer.sendSync('exec-status', [executableGUID]);
    setReturnValue(ipcResult);
  }, [executableGUID]);

  return returnValue;
}
