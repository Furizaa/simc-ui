import { VStack } from '@chakra-ui/core';
import React from 'react';

export interface SimcCardListProps {
  children: React.ReactNode;
}

export default function SimcCardList({ children }: SimcCardListProps) {
  return <VStack w="xs">{children}</VStack>;
}
