import React from 'react';
import { Box } from '@chakra-ui/core';
import { CardDropdown } from '@shared/components/Card';
import { CardDropdownValue } from '@shared/components/Card/CardDropdown';
import SimcConfigurationCardList from '../SimcConfigurationCard/SimcConfigurationCardList';
import SimcConfigurationCardContent from '../SimcConfigurationCard/SimcConfigurationCardContent';
import simConfigurations from '../../../data/simConfigs';
import SimcConfigurationCard from '../SimcConfigurationCard/SimcConfigurationCard';

export interface SimcConfigurationDropdownProps {
  onSelect?: (value: CardDropdownValue) => void;
  value: CardDropdownValue;
}

export default function SimcConfigurationDropdown({ onSelect, value }: SimcConfigurationDropdownProps) {
  return (
    <Box>
      <CardDropdown
        onSelect={onSelect}
        value={value}
        label="Select Simulationcraft Configuration"
        renderItems={({ handleSelect }) => (
          <SimcConfigurationCardList>
            {simConfigurations.map((conf) => (
              <SimcConfigurationCard
                key={conf.id}
                name={conf.name}
                description={conf.description}
                onSelect={() => handleSelect(conf.id)}
              />
            ))}
          </SimcConfigurationCardList>
        )}
        renderSelectedItem={(selectedId) => {
          const selectedConfigurationOption = selectedId
            ? simConfigurations.find((conf) => conf.id === selectedId)
            : undefined;

          if (selectedConfigurationOption) {
            return (
              <SimcConfigurationCardContent
                name={selectedConfigurationOption.name}
                description={selectedConfigurationOption.description}
              />
            );
          }
          return null;
        }}
      />
    </Box>
  );
}
