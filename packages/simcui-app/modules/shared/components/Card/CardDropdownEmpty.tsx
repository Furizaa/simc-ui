import { Button } from '@chakra-ui/core';
import React from 'react';
import Card, { CardProps } from './Card';

export interface CardDropdownEmptyProps extends Omit<CardProps, 'children'> {
  label: string;
}

export default function CardDropdownEmpty({ label, ...rest }: CardDropdownEmptyProps) {
  return (
    <Card variant="outline" d="flex" justifyContent="center" {...rest}>
      <Button variant="ghost">{label}</Button>
    </Card>
  );
}
