import { useCallback } from 'react';
import useEquipmentStore from '../store/useEquipmentStore';
import useTCIEnchant from './useTCIEnchant';
import useTCIEquippedItem from './useTCIEquippedItem';

export interface UseTCIProps {
  equipmentSetId?: string;
}

export default function useTCISlots({ equipmentSetId }: UseTCIProps) {
  const [equipment, enchants] = useEquipmentStore(
    useCallback((store) => [store.getEquipmentSet(equipmentSetId), store.getEquipmentSetEnchants(equipmentSetId)], [
      equipmentSetId,
    ]),
  );

  const profile: Record<string, string> = {};

  profile.head = [
    useTCIEquippedItem({ itemInstanceId: equipment?.HEAD }),
    useTCIEnchant({ enchantId: enchants?.HEAD }),
  ].join(',');

  profile.neck = [
    useTCIEquippedItem({ itemInstanceId: equipment?.NECK }),
    useTCIEnchant({ enchantId: enchants?.NECK }),
  ].join(',');

  profile.shoulders = [
    useTCIEquippedItem({ itemInstanceId: equipment?.SHOULDER }),
    useTCIEnchant({ enchantId: enchants?.SHOULDER }),
  ].join(',');

  profile.back = [
    useTCIEquippedItem({ itemInstanceId: equipment?.BACK }),
    useTCIEnchant({ enchantId: enchants?.BACK }),
  ].join(',');

  profile.chest = [
    useTCIEquippedItem({ itemInstanceId: equipment?.CHEST }),
    useTCIEnchant({ enchantId: enchants?.CHEST }),
  ].join(',');

  profile.wrist = [
    useTCIEquippedItem({ itemInstanceId: equipment?.WRIST }),
    useTCIEnchant({ enchantId: enchants?.WRIST }),
  ].join(',');

  profile.hands = [
    useTCIEquippedItem({ itemInstanceId: equipment?.HANDS }),
    useTCIEnchant({ enchantId: enchants?.HANDS }),
  ].join(',');

  profile.waist = [
    useTCIEquippedItem({ itemInstanceId: equipment?.WAIST }),
    useTCIEnchant({ enchantId: enchants?.WAIST }),
  ].join(',');

  profile.legs = [
    useTCIEquippedItem({ itemInstanceId: equipment?.LEGS }),
    useTCIEnchant({ enchantId: enchants?.LEGS }),
  ].join(',');

  profile.feet = [
    useTCIEquippedItem({ itemInstanceId: equipment?.FEET }),
    useTCIEnchant({ enchantId: enchants?.FEET }),
  ].join(',');

  profile.finger1 = [
    useTCIEquippedItem({ itemInstanceId: equipment?.FINGER_1 }),
    useTCIEnchant({ enchantId: enchants?.FINGER_1 }),
  ].join(',');

  profile.finger2 = [
    useTCIEquippedItem({ itemInstanceId: equipment?.FINGER_2 }),
    useTCIEnchant({ enchantId: enchants?.FINGER_2 }),
  ].join(',');

  profile.trinket1 = [
    useTCIEquippedItem({ itemInstanceId: equipment?.TRINKET_1 }),
    useTCIEnchant({ enchantId: enchants?.TRINKET_1 }),
  ].join(',');

  profile.trinket2 = [
    useTCIEquippedItem({ itemInstanceId: equipment?.TRINKET_2 }),
    useTCIEnchant({ enchantId: enchants?.TRINKET_2 }),
  ].join(',');

  profile.main_hand = [
    useTCIEquippedItem({ itemInstanceId: equipment?.MAIN_HAND }),
    useTCIEnchant({ enchantId: enchants?.MAIN_HAND }),
  ].join(',');

  profile.off_hand = [
    useTCIEquippedItem({ itemInstanceId: equipment?.OFF_HAND }),
    useTCIEnchant({ enchantId: enchants?.OFF_HAND }),
  ].join(',');

  return profile;
}
