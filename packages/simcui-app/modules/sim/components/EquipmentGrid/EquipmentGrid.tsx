import { Box, Grid, GridProps } from '@chakra-ui/core';
import React from 'react';
import { WOW } from '../../../../types';
import EquippedItemInstaceEmpty from '../EquippedItemInstaceEmpty';

export interface EquipmentGridProps extends GridProps {
  equipment: Partial<Record<WOW.Slot, React.ReactElement>>;
}

const sortList: WOW.Slot[] = [
  'HEAD',
  'HANDS',
  'NECK',
  'WAIST',
  'SHOULDER',
  'LEGS',
  'BACK',
  'FEET',
  'CHEST',
  'FINGER_1',
  'SHIRT',
  'FINGER_2',
  'TABARD',
  'TRINKET_1',
  'WRIST',
  'TRINKET_2',
];

export default function EquipmentGrid({ equipment, ...rest }: EquipmentGridProps) {
  const mainHand = equipment.MAIN_HAND;
  const offHand = equipment.OFF_HAND;

  return (
    <Grid templateColumns="1fr 1fr" rowGap={2} columnGap={5} {...rest}>
      {sortList.map((slot, index) => {
        const piece = equipment[slot];
        const displayDirection = index % 2 === 0 ? 'left' : 'right';
        if (piece) {
          return React.cloneElement(piece, { key: slot, displayDirection, ...piece.props });
        }
        return <EquippedItemInstaceEmpty key={slot} displayDirection={displayDirection} />;
      })}
      <Box mt={4}>
        {mainHand ? (
          React.cloneElement(mainHand, { displayDirection: 'right', ...mainHand.props })
        ) : (
          <EquippedItemInstaceEmpty displayDirection="right" />
        )}
      </Box>
      <Box mt={4}>{offHand || <EquippedItemInstaceEmpty displayDirection="left" />}</Box>
    </Grid>
  );
}
