import { HStack } from '@chakra-ui/core';
import React from 'react';

export interface BreadcrumbBarProps {
  children: React.ReactNode;
}

export default function BreadcrumbBar({ children }: BreadcrumbBarProps) {
  return (
    <HStack spacing={0} bgColor="translucent">
      {children}
    </HStack>
  );
}
