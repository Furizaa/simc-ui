import { useCallback } from 'react';
import useItemInstanceStore from '../store/useItemInstanceStore';
import useBaseItemStore from '../store/useBaseItemStore';
import tciTokenize from '../util/tciTokenize';

export interface UseTCIEquippedItemProps {
  itemInstanceId?: string;
}

export default function useTCIEquippedItem({ itemInstanceId }: UseTCIEquippedItemProps) {
  const itemInstance = useItemInstanceStore(
    useCallback((store) => store.getItemInstance(itemInstanceId), [itemInstanceId]),
  );
  const baseItem = useBaseItemStore(
    useCallback((store) => itemInstance && store.getBaseItem(itemInstance.baseItemId), [itemInstance]),
  );

  if (!baseItem) {
    return '';
  }

  if (itemInstance && baseItem.error) {
    return `[Error:${baseItem.error.text}]`;
  }

  if (itemInstance && baseItem.status !== 'done') {
    return `[Loading...]`;
  }

  if (itemInstance && baseItem.status === 'done' && baseItem.data) {
    const parts = [];

    const name = tciTokenize(baseItem.data.name.en_US);

    parts.push(name);
    parts.push(`id=${baseItem.data.id}`);

    if (itemInstance.bonusIds) {
      parts.push(`bonus_id=${itemInstance.bonusIds.join('/')}`);
    }

    return `${parts.join(',')}`;
  }
  return ``;
}
