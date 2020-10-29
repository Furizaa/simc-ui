import { Grid } from '@chakra-ui/core';
import React from 'react';

export interface SimcConfigurationCardListProps {
  children: React.ReactNode;
}

export default function SimcConfigurationCardList({ children }: SimcConfigurationCardListProps) {
  return (
    <Grid templateColumns="1fr 1fr" gap={3}>
      {children}
    </Grid>
  );
}
