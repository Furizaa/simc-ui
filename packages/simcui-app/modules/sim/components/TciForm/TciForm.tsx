import { Textarea } from '@chakra-ui/core';
import React from 'react';

export interface TciFormProps {
  tci: string;
}

export default function TciForm({ tci }: TciFormProps) {
  return <Textarea variant="filled" defaultValue={tci} resize="none" height="lg" />;
}
