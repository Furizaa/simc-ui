import { useCallback } from 'react';
import useBaseItemStore from '../store/useBaseItemStore';
import tciTokenize from '../util/tciTokenize';
import useBaseEnchantStore from '../store/useBaseEnchantStore';

export interface UseTCIEnchantProps {
  enchantId?: number;
}

const tciEnchant = (str: string | undefined) => {
  return str ? `enchant=${tciTokenize(str)}` : undefined;
};

export default function useTCIEnchant({ enchantId }: UseTCIEnchantProps) {
  const baseEnchant = useBaseEnchantStore(useCallback((store) => store.getBaseEnchant(enchantId), [enchantId]));
  const baseEnchantItem = useBaseItemStore(
    useCallback((store) => baseEnchant && store.getBaseItem(baseEnchant.sourceItemId), [baseEnchant]),
  );

  // Slot has no enchantment
  if (!baseEnchant) {
    return undefined;
  }

  // Try to generate canonical from enchants name
  // @see https://github.com/simulationcraft/simc/blob/4f5bc4e1c4750047724ac7e6aaf621aa3f19bf99/engine/item/enchants.cpp#L90

  // Enchant has no associated item.
  // This is the worst case and according to the simc code probably not right -
  // but there is no other way. Remove the "Enchanted:" prefix if applicable.
  if (!baseEnchantItem) {
    const match = new RegExp(/^(Enchanted:\s)(.+)$/).exec(baseEnchant.name.en_US);
    if (match && match[2]) {
      return tciEnchant(match[2]);
    }
    return tciEnchant(baseEnchant.name.en_US);
  }

  // Enchant base item is still fetched
  if (baseEnchantItem && baseEnchantItem.status === 'loading') {
    return '[Loading ...]';
  }

  // We've got a proper base item!
  // Test for "Enchant XXX - <name>" and use this as a canonical name if found. If we
  // can't match that pattern fall back to the linked spells name.
  if (baseEnchantItem && baseEnchantItem.status === 'done' && baseEnchantItem.data) {
    const match = new RegExp(/^Enchant(.+\s-\s)(.+)$/).exec(baseEnchantItem.data.name.en_US);
    if (match && match[2]) {
      return tciEnchant(match[2]);
    }
    if (baseEnchantItem.data.spells) {
      // Lets just hope for now the enchantment is the first and only spell on the
      // enchanting item.
      const spellName = baseEnchantItem.data.spells[0].spell.name.en_US;
      return tciEnchant(spellName);
    }
    // No matches at all? Welp. Return just the name.
    return tciEnchant(baseEnchantItem.data.name.en_US);
  }

  if (baseEnchantItem && baseEnchantItem.status === 'done' && baseEnchantItem.error) {
    return `[Error: ${baseEnchantItem.error.text}]`;
  }

  // We can't handle other cases
  return undefined;
}
