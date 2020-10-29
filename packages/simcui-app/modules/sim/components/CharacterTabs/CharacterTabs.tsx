import { Box, Grid, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/core';
import useCharacterTabStore from '@sim/store/useCharacterTabStore';
import React, { useCallback } from 'react';
import useDimensions from 'react-use-dimensions';

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
  const [ref, { height }] = useDimensions();
  const bgStyle = { backdropFilter: 'blur(20px)' };

  return (
    <Box borderTopColor="gray.600" borderTopWidth="1px">
      <Box h="1em" style={bgStyle} />
      <Grid templateColumns="1em 1fr 1em">
        <Box h={height + 1} borderBottom="2px solid" borderBottomColor="gray.400" style={bgStyle} />
        <Tabs isLazy isFitted index={tabIndex} onChange={setTabIndex} colorScheme="blue" variant="enclosed">
          <TabList ref={ref}>
            <Tab isDisabled={!equipmentPanel}>Equipment</Tab>
            <Tab isDisabled={!talentsPanel}>Skills</Tab>
            <Tab isDisabled={!soulbindPanel}>Soulbinds</Tab>
            <Tab isDisabled={!tciPanel}>Text Config Interface</Tab>
            <Tab isDisabled={!resultsPanel}>Results</Tab>
          </TabList>
          <TabPanels mt={8}>
            <TabPanel>{equipmentPanel}</TabPanel>
            <TabPanel>{talentsPanel}</TabPanel>
            <TabPanel>{soulbindPanel}</TabPanel>
            <TabPanel>{tciPanel}</TabPanel>
            <TabPanel>{resultsPanel}</TabPanel>
          </TabPanels>
        </Tabs>
        <Box h={height + 1} borderBottom="2px solid" borderBottomColor="gray.400" style={bgStyle} />
      </Grid>
    </Box>
  );
}
