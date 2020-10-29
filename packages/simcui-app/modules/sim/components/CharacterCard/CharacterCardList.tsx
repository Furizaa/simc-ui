import { Grid } from '@chakra-ui/core';
import React from 'react';

export interface CharacterCardListProps {
  children: React.ReactNode[];
}

export default function CharacterCardList({ children }: CharacterCardListProps) {
  return (
    <Grid templateColumns="1fr 1fr 1fr" gap={2} w="lg">
      {children}
    </Grid>
  );
}
