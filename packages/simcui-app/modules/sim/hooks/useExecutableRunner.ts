import useCharacterTabStore, { CHARACTER_TAB_INDEX } from '@sim/store/useCharacterTabStore';
import { ipcRenderer, IpcRendererEvent } from 'electron';
import { useCallback, useEffect } from 'react';
import { NativeEventReturnValue, NativeRunEventData, SimProcess, SimProcessId } from '../../../types';
import useSimProcessStore from '../store/useSimProcessStore';

export default function useExecutableRunner(procId: SimProcessId = '0', tci: string) {
  const backChannel = `sim-status/${procId}`;

  const setSimProcessStatus = useSimProcessStore(useCallback((state) => state.setProcessStatus, []));
  const setCharacterTabIndex = useCharacterTabStore(useCallback((store) => store.setTabIndex, []));

  const onProcessStatusChange = (simProcess: SimProcess | null) => {
    if (!simProcess) {
      return;
    }

    if (simProcess.status.type === 'staged') {
      setSimProcessStatus(procId, { type: 'running', percentage: 0 });
      ipcRenderer.send('sim', [procId, tci]);
    }
  };

  const onRunnerSignal = useCallback(
    (_: IpcRendererEvent, args: NativeEventReturnValue<NativeRunEventData>) => {
      if (args.error) {
        return setSimProcessStatus(procId, { type: 'error', errorText: args.error });
      }
      if (args.data?.stage === 'running') {
        return setSimProcessStatus(procId, { type: 'running', percentage: args.data.percentage });
      }
      if (args.data?.stage === 'done') {
        setCharacterTabIndex(CHARACTER_TAB_INDEX.RESULTS);
        return setSimProcessStatus(procId, { type: 'done', result: JSON.parse(args.data.output) });
      }
      return null;
    },
    [procId, setSimProcessStatus],
  );

  const processSubscription = useSimProcessStore.subscribe(onProcessStatusChange, (state) => state.list[procId]);

  useEffect(() => {
    ipcRenderer.on(backChannel, onRunnerSignal);
    return () => {
      ipcRenderer.off(backChannel, onRunnerSignal);
    };
  }, [backChannel, onRunnerSignal]);

  // Stop listening to processSubscription on unmount
  useEffect(() => processSubscription);
}
