import { Grid } from '@chakra-ui/core';
import React from 'react';
import { SimProcess } from '../../../../types';
import GraphDps from '../GraphDps';
import GraphResource from '../GraphResource';
import GraphSkillDamage from '../GraphSkillDamage';

export interface RunnerResultProps {
  process: SimProcess;
}

// https://github.com/simulationcraft/simc/blob/a2c5760e1d8219f1ea6c430bb4187328be2011f9/engine/util/util.cpp#L874
const resourceTypes = [
  { key: 'health', colorScheme: 'red', label: 'Resource: Health' },
  { key: 'mana', colorScheme: 'blue', label: 'Resource: Mana' },
  { key: 'rage', colorScheme: 'classWarrior', label: 'Resource: Rage' },
  { key: 'astral_power', colorScheme: 'classDruid', label: 'Resource: Astral Power' },
  { key: 'energy', colorScheme: 'classRogue', label: 'Resource: Energy' },
  { key: 'focus', colorScheme: 'classHunter', label: 'Resource: Focus' },
  { key: 'runic_power', colorScheme: 'classDeathknight', label: 'Resource: Runic Power' },
  { key: 'rune', colorScheme: 'classDeathknight', label: 'Resource: Runes' },
  { key: 'soul_shard', colorScheme: 'classWarlock', label: 'Resource: Soul Shards' },
  { key: 'holy_power', colorScheme: 'classPaladin', label: 'Resource: Holy Power' },
  { key: 'chi', colorScheme: 'classMonk', label: 'Resource: Chi' },
  { key: 'combo_points', colorScheme: 'classRogue', label: 'Resource: Combo Points' },
  { key: 'maelstrom', colorScheme: 'classShaman', label: 'Resource: Maelstrom' },
  { key: 'fury', colorScheme: 'classWarrior', label: 'Resource: Fury' },
  { key: 'pain', colorScheme: 'classWarlock', label: 'Resource: Pain' },
  { key: 'insanity', colorScheme: 'classPries', label: 'Resource: Insanity' },
];

export default function RunnerResult({ process }: RunnerResultProps) {
  if (process.status.type !== 'done') {
    return null;
  }

  const { result } = process.status;

  return (
    <Grid templateColumns="1fr 1fr" gap={2}>
      <GraphDps simResult={result} />
      {resourceTypes.map(resource => {
        const resourceData = result.sim?.players[0]?.collected_data?.resource_timelines?.[resource.key]?.data;
        if (resourceData) {
          return (
            <GraphResource
              simResult={result}
              colorScheme={resource.colorScheme}
              label={resource.label}
              resourceKey={resource.key}
              key={resource.key}
            />
          );
        }
        return null;
      })}
      <GraphSkillDamage simResult={result} colorScheme="red" />
    </Grid>
  );
}
