import React from 'react';
import { Box } from '@chakra-ui/core';
import { CardDropdown } from '@shared/components/Card';
import { CardDropdownValue } from '@shared/components/Card/CardDropdown';
import executableConstants from '../../../data/executables';
import SimcExecutableCardBinding from '../SimcExecutableCard/SimcExecutableCardBinding';
import SimcExecutableCardList from '../SimcExecutableCard/SimcExecutableCardList';
import SimcExecutableCardContent from '../SimcExecutableCard/SimcExecutableCardContent';

export interface SimcExecutableDropdownProps {
  onSelect?: (value: CardDropdownValue) => void;
  value: CardDropdownValue;
}

export default function SimcExecutableDropdown({ onSelect, value }: SimcExecutableDropdownProps) {
  return (
    <Box maxW="sm">
      <CardDropdown
        onSelect={onSelect}
        value={value}
        label="Select Simulationcraft Version"
        renderItems={({ handleSelect }) => (
          <SimcExecutableCardList>
            {executableConstants.map((exec) => (
              <SimcExecutableCardBinding key={exec.guid} executable={exec} onSelect={() => handleSelect(exec.guid)} />
            ))}
          </SimcExecutableCardList>
        )}
        renderSelectedItem={(selectedGUID) => {
          const selectedExecutableOption = selectedGUID
            ? executableConstants.find((exec) => exec.guid === selectedGUID)
            : undefined;

          if (selectedExecutableOption) {
            return <SimcExecutableCardContent config={{ stage: 'ready' }} executable={selectedExecutableOption} />;
          }
          return null;
        }}
      />
    </Box>
  );
}
