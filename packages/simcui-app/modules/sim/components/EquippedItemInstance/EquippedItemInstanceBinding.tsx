import React, { useCallback } from 'react';
import useBaseItemStore from '../../store/useBaseItemStore';
import useItemInstanceStore from '../../store/useItemInstanceStore';
import EquippedItemInstance, { EquippedItemInstanceProps } from './EquippedItemInstance';
import EquippedItemInstanceLoading from '../EquippedItemInstanceLoading';
import EquippedItemInstanceQueue from '../EquippedItemInstanceQueue';

export interface EquippedItemInstanceBindingProps extends Pick<EquippedItemInstanceProps, 'displayDirection'> {
  itemInstanceId: string;
}

export default function EquippedItemInstanceBinding({ itemInstanceId, ...rest }: EquippedItemInstanceBindingProps) {
  const itemInstance = useItemInstanceStore(
    useCallback(store => store.getItemInstance(itemInstanceId), [itemInstanceId]),
  );
  const itemBaseAsync = useBaseItemStore(
    useCallback(store => itemInstance && store.getBaseItem(itemInstance.baseItemId), [itemInstance]),
  );

  if (itemInstance && itemBaseAsync && itemBaseAsync.status === 'done' && itemBaseAsync.data) {
    const itemBase = itemBaseAsync.data;
    return (
      <EquippedItemInstance
        {...rest}
        name={itemBase.name.en_US}
        quality={itemInstance.dropQuality}
        ilvl={itemInstance.dropLvl}
        iconSrc={itemBase.icon ?? 'TODO Fallback'}
        enchantmentDisplays={[]}
        gemDisplays={[]}
      />
    );
  }

  if (itemBaseAsync && itemBaseAsync?.status === 'queue') {
    <EquippedItemInstanceQueue {...rest} />;
  }

  return <EquippedItemInstanceLoading {...rest} />;
}
