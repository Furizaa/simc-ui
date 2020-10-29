import React, { useCallback } from 'react';
import useExecutableRunner from '../../hooks/useExecutableRunner';
import useSimProcessStore from '../../store/useSimProcessStore';
import useSimulationsStore from '../../store/useSimulationsStore';
import useSnapshotStore from '../../store/useSnapshotStore';
import useTCI from '../../hooks/useTCI';
import RunnerStatusError from '../RunnerStatusError';
import RunnerStatus from './RunnerStatus';

export interface RunnerStatusBindingProps {
  simulationId: string;
  snapshotId: string;
  characterId: string;
}

export default function RunnerStatusBinding({ simulationId, snapshotId, characterId }: RunnerStatusBindingProps) {
  const currentSimulation = useSimulationsStore(
    useCallback((store) => store.getSimulation(simulationId), [simulationId]),
  );
  const [currentSnapshot, freezeSnapshot] = useSnapshotStore(
    useCallback((store) => [store.getSnapshot(snapshotId), store.freezeSnapshot], [snapshotId]),
  );
  const setProcessStatus = useSimProcessStore(useCallback((store) => store.setProcessStatus, []));
  const currentProcess = useSimProcessStore(
    useCallback((store) => store.getProcess(currentSnapshot?.simProcessId), [currentSnapshot]),
  );

  const tci = useTCI({ characterId });
  useExecutableRunner(currentSimulation?.executableGUID, currentSnapshot?.simProcessId, tci);

  const handleRunProcessClick = () => {
    if (currentSnapshot) {
      if (!currentSnapshot.isFrozen) {
        freezeSnapshot(currentSnapshot.id);
      }
      setProcessStatus(currentSnapshot.simProcessId, { type: 'staged' });
    }
  };

  const handleResetProcessClick = () => {
    if (currentSnapshot) {
      setProcessStatus(currentSnapshot.simProcessId, { type: 'idle' });
    }
  };

  if (currentProcess && currentProcess.status.type === 'running') {
    return (
      <RunnerStatus
        onClickRun={handleRunProcessClick}
        currentRun={{ status: 'running', percentage: currentProcess.status.percentage }}
      />
    );
  }

  if (currentProcess && currentProcess.status.type === 'staged') {
    return <RunnerStatus onClickRun={handleRunProcessClick} currentRun={{ status: 'running', percentage: 0 }} />;
  }

  if (currentProcess && currentProcess.status.type === 'done') {
    return (
      <RunnerStatus
        onClickRun={handleRunProcessClick}
        currentRun={{
          status: 'done',
          dps: currentProcess.status.result?.sim?.players[0]?.collected_data?.dps?.mean ?? 0,
        }}
      />
    );
  }

  if (currentProcess && currentProcess.status.type === 'dirty') {
    return (
      <RunnerStatus
        onClickRun={handleRunProcessClick}
        currentRun={{
          status: 'dirty',
          dps: currentProcess.status.result?.sim?.players[0]?.collected_data?.dps?.mean ?? 0,
        }}
      />
    );
  }

  if (currentProcess && currentProcess.status.type === 'error') {
    return <RunnerStatusError onClickReset={handleResetProcessClick} errorText={currentProcess.status.errorText} />;
  }

  return <RunnerStatus onClickRun={handleRunProcessClick} currentRun={{ status: 'idle' }} />;
}
