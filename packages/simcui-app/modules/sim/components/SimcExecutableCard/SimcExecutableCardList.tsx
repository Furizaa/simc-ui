import { Grid } from '@chakra-ui/core';
import React from 'react';

export interface SimcExecutableCardListProps {
  children: React.ReactNode;
}

export default function SimcExecutableCardList({ children }: SimcExecutableCardListProps) {
  return (
    <Grid templateColumns="1fr 1fr" gap={3}>
      {children}
    </Grid>
  );
}
