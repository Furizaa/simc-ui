import React from 'react';
import { Button, HStack } from '@chakra-ui/core';
import Breadcrumb from '@shared/components/Breadcrumb';
import { BreadcrumbValue } from '@shared/components/Breadcrumb/Breadcrumb';
import SimcCardList from '../SimcCard/SimcCardList';
import { SimulationConfig, SimulationParameters } from '../../../../types';
import SimcCardContent from '../SimcCard/SimcCardContent';
import SimcCard from '../SimcCard/SimcCard';

export interface SimcDropdownProps {
  onSelect?: (value: BreadcrumbValue) => void;
  onCreateNewClick?: () => void;
  value: BreadcrumbValue;
  simulationParameterList: SimulationParameters[];
  simulationConfigList: SimulationConfig[];
}

export default function SimcDropdown({
  onSelect,
  onCreateNewClick,
  value,
  simulationParameterList,
  simulationConfigList,
}: SimcDropdownProps) {
  const handleCreateNewClick = () => {
    if (onCreateNewClick) {
      onCreateNewClick();
    }
  };

  return (
    <Breadcrumb
      label="Select Simulation"
      onSelect={onSelect}
      value={value}
      placement="bottom"
      renderItems={({ handleSelect }) => (
        <SimcCardList>
          {simulationParameterList.map((param) => {
            const configuration = simulationConfigList.find((conf) => conf.id === param.configurationId);
            if (configuration) {
              return (
                <SimcCard
                  key={param.id}
                  onSelect={() => handleSelect(param.id)}
                  simcConfigDisplay={configuration.name}
                />
              );
            }
            return null;
          })}
        </SimcCardList>
      )}
      renderSelectedItem={(selectedValue) => {
        const parameters = simulationParameterList.find((param) => param.id === selectedValue);
        if (parameters) {
          const configuration = simulationConfigList.find((conf) => conf.id === parameters.configurationId);
          if (configuration) {
            return <SimcCardContent simcConfigDisplay={configuration.name} />;
          }
        }
        return null;
      }}
      renderFooter={() => (
        <HStack>
          <Button size="xs" disabled={!onCreateNewClick} onClick={handleCreateNewClick}>
            Create New Simulation
          </Button>
          <Button size="xs" variant="ghost" disabled>
            Manage All
          </Button>
        </HStack>
      )}
    />
  );
}
