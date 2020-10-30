import { Box, Grid, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/core';
import { AddIcon, SettingsIcon } from '@chakra-ui/icons';
import React from 'react';
import { Simulation, SimulationId } from 'types';

export interface SimulationTabsProps {
  simulations: Simulation[];
  selectedSimulationId?: SimulationId;
  onSelectSimulation?: (configId: SimulationId) => void;
  onClickAddSimulation?: () => void;
  renderTabPanel?: (configId: SimulationId) => React.ReactNode;
}

export default function SimulationTabs({
  simulations,
  selectedSimulationId,
  onSelectSimulation,
  onClickAddSimulation,
  renderTabPanel,
}: SimulationTabsProps) {
  const handleTabChange = (index: number) => {
    if (onSelectSimulation && simulations[index]) {
      onSelectSimulation(simulations[index].id);
    }
  };

  const handleAddSimulation = () => {
    if (onClickAddSimulation) {
      onClickAddSimulation();
    }
  };

  const selectedSim = simulations.find((sim) => sim.id === selectedSimulationId);
  const selectedIndex = (selectedSim && simulations.indexOf(selectedSim)) ?? -1;

  return (
    <Box bgColor="gray.800" h="100%">
      <Tabs variant="config" h="100%" onChange={handleTabChange} index={selectedIndex}>
        <Grid templateRows="auto 1fr" h="100%">
          <TabList
            pl={20}
            css={{
              WebkitAppRegion: 'drag',
            }}
          >
            {simulations.map((sim) => (
              <Tab key={sim.id}>
                <SettingsIcon mr={2} />
                {sim.name}
              </Tab>
            ))}
            <Tab onClick={handleAddSimulation}>
              <AddIcon />
            </Tab>
          </TabList>
          <TabPanels h="100%">
            {simulations.map((sim) => (
              <TabPanel p={0} pt={2} h="100%" key={sim.id}>
                {renderTabPanel && selectedSim && renderTabPanel(selectedSim.id)}
              </TabPanel>
            ))}
          </TabPanels>
        </Grid>
      </Tabs>
    </Box>
  );
}
