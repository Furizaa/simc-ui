import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/core';
import useCharacterTabStore from '@sim/store/useCharacterTabStore';
import React, { useCallback } from 'react';

export interface CharacterTabsProps {
  equipmentPanel?: React.ReactNode;
  talentsPanel?: React.ReactNode;
  soulbindPanel?: React.ReactNode;
  tciPanel?: React.ReactNode;
  resultsPanel?: React.ReactNode;
}

export default function CharacterTabs({
  equipmentPanel,
  talentsPanel,
  soulbindPanel,
  tciPanel,
  resultsPanel,
}: CharacterTabsProps) {
  const [tabIndex, setTabIndex] = useCharacterTabStore(useCallback((store) => [store.tabIndex, store.setTabIndex], []));

  return (
    <Box>
      <Tabs isLazy isFitted index={tabIndex} onChange={setTabIndex} colorScheme="gray" variant="enclosed">
        <TabList>
          <Tab isDisabled={!equipmentPanel}>Equipment</Tab>
          <Tab isDisabled={!talentsPanel}>Skills</Tab>
          <Tab isDisabled={!soulbindPanel}>Soulbinds</Tab>
          <Tab isDisabled={!tciPanel}>Simc Text</Tab>
          <Tab isDisabled={!resultsPanel}>Results</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>{equipmentPanel}</TabPanel>
          <TabPanel>{talentsPanel}</TabPanel>
          <TabPanel>{soulbindPanel}</TabPanel>
          <TabPanel>{tciPanel}</TabPanel>
          <TabPanel>{resultsPanel}</TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
