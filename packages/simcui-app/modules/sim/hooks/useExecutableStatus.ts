import { ipcRenderer } from 'electron';
import { useEffect, useState } from 'react';
import { NativeEventReturnValue, NativeStatusEventData } from '../../../types';

export default function useExecutableStatus() {
  const [returnValue, setReturnValue] = useState<NativeEventReturnValue<NativeStatusEventData>>({
    data: null,
    error: null,
  });

  useEffect(() => {
    const ipcResult = ipcRenderer.sendSync('exec-status');
    setReturnValue(ipcResult);
  }, []);

  return returnValue;
}
