import {
  Box,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverProps,
  PopoverTrigger,
} from '@chakra-ui/core';
import { ArrowUpDownIcon } from '@chakra-ui/icons';
import React from 'react';
import Card, { CardProps } from './Card';
import CardDropdownEmpty from './CardDropdownEmpty';

export type CardDropdownValue = string | number | undefined;

interface ItemRenderProps {
  value: CardDropdownValue;
  handleSelect: (value: CardDropdownValue) => void;
}

export interface CardDropdownProps extends Omit<CardProps, 'onSelect'> {
  initialValue?: CardDropdownValue;
  initialIsOpen?: boolean;
  value?: CardDropdownValue;
  label: string;
  placement?: PopoverProps['placement'];
  variant?: CardProps['variant'];
  renderSelectedItem?: (value: CardDropdownValue) => React.ReactNode;
  renderItems?: (renderProps: ItemRenderProps) => React.ReactNode;
  renderFooter?: () => React.ReactNode;
  onSelect?: (value: CardDropdownValue) => void;
}

export default function CardDropdown({
  children,
  initialValue,
  initialIsOpen,
  label,
  onClick,
  renderSelectedItem,
  renderItems,
  renderFooter,
  onSelect,
  value: controlledValue,
  placement = 'bottom',
  variant,
  ...rest
}: CardDropdownProps) {
  const [internalValue, setInternalValue] = React.useState<CardDropdownValue>(initialValue);
  const [isOpen, setOpen] = React.useState<boolean>(Boolean(initialIsOpen));
  const isControlled = Boolean(controlledValue);
  const value = isControlled ? controlledValue : internalValue;

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    setOpen(!isOpen);
  };

  const handleCloseClick = () => {
    setOpen(false);
  };

  const handleSelect = (val: CardDropdownValue) => {
    setInternalValue(val);
    setOpen(false);
    if (onSelect) {
      onSelect(val);
    }
  };

  const triggerComponent = value ? (
    <Card
      variant={variant}
      d="flex"
      alignItems="center"
      justifyContent="space-between"
      onClick={handleClick}
      role="group"
      {...rest}
    >
      <Box>{renderSelectedItem ? renderSelectedItem(value) : null}</Box>
      <ArrowUpDownIcon fontSize="2xl" ml={3} visibility="hidden" _groupHover={{ visibility: 'visible' }} />
    </Card>
  ) : (
    <CardDropdownEmpty label={label} onClick={handleClick} {...rest} />
  );

  return (
    <Popover isOpen={isOpen} placement={placement} closeOnBlur closeOnEsc>
      <PopoverTrigger>
        <Box>{triggerComponent}</Box>
      </PopoverTrigger>

      <PopoverContent>
        <PopoverHeader border={0}>{label}</PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton onClick={handleCloseClick} />
        <PopoverBody>{renderItems ? renderItems({ value, handleSelect }) : null}</PopoverBody>
        {renderFooter ? <PopoverFooter>{renderFooter()}</PopoverFooter> : null}
      </PopoverContent>
    </Popover>
  );
}
