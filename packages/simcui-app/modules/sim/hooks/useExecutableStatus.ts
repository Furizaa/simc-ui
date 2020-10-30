import { ipcRenderer } from 'electron';
import { useEffect, useState } from 'react';
import { NativeEventReturnValue } from '../../../types';

export default function useExecutableStatus() {
  const [returnValue, setReturnValue] = useState<NativeEventReturnValue<boolean>>({
    data: null,
    error: null,
  });

  useEffect(() => {
    const ipcResult = ipcRenderer.sendSync('exec-status');
    setReturnValue(ipcResult);
  }, []);

  return returnValue;
}
