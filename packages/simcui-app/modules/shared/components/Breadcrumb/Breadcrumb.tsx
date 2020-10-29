import {
  Box,
  BoxProps,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverProps,
  PopoverTrigger,
  Portal,
} from '@chakra-ui/core';
import useDimensions from 'react-use-dimensions';
import { ArrowUpDownIcon } from '@chakra-ui/icons';
import React from 'react';

export type BreadcrumbValue = string | undefined;

interface ItemRenderProps {
  value: BreadcrumbValue;
  handleSelect: (value: BreadcrumbValue) => void;
}

export interface BreadcrumbProps extends Omit<BoxProps, 'onSelect' | 'bgColor' | 'backgroundColor'> {
  initialValue?: BreadcrumbValue;
  initialIsOpen?: boolean;
  value?: BreadcrumbValue;
  label: string;
  placement?: PopoverProps['placement'];
  bgColor?: BoxProps['bgColor'];
  backgroundColor?: BoxProps['backgroundColor'];
  renderSelectedItem?: (value: BreadcrumbValue) => React.ReactNode;
  renderItems?: (renderProps: ItemRenderProps) => React.ReactNode;
  renderFooter?: () => React.ReactNode;
  renderEmpty?: () => React.ReactNode;
  onSelect?: (value: BreadcrumbValue) => void;
  onClick?: () => void;
}

export default function Breadcrumb({
  children,
  initialValue,
  initialIsOpen,
  label,
  onClick,
  bgColor,
  backgroundColor,
  renderSelectedItem,
  renderItems,
  renderFooter,
  renderEmpty,
  onSelect,
  value: controlledValue,
  placement = 'bottom',
  ...rest
}: BreadcrumbProps) {
  const [ref, { height }] = useDimensions();
  const [internalValue, setInternalValue] = React.useState<BreadcrumbValue>(initialValue ?? undefined);
  const [isOpen, setOpen] = React.useState<boolean>(Boolean(initialIsOpen));
  const isControlled = Boolean(controlledValue);
  const value = isControlled ? controlledValue : internalValue;
  const color = bgColor || backgroundColor || 'gray.800';

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    setOpen(!isOpen);
  };

  const handleCloseClick = () => {
    setOpen(false);
  };

  const handleSelect = (val: BreadcrumbValue) => {
    setInternalValue(val);
    setOpen(false);
    if (onSelect) {
      onSelect(val);
    }
  };

  if (!value) {
    if (renderEmpty) {
      return <>{renderEmpty()}</>;
    }
    return null;
  }

  const triggerComponent = (
    <Box {...rest} h="100%" d="flex" alignItems="center" justifyContent="space-between" onClick={handleClick}>
      <Box h="100%">{renderSelectedItem ? renderSelectedItem(value) : null}</Box>
      <ArrowUpDownIcon
        color="gray.300"
        zIndex="2"
        fontSize="2xl"
        ml={3}
        visibility="hidden"
        _groupHover={{ visibility: 'visible' }}
      />
    </Box>
  );

  return (
    <Box
      role="group"
      h="67px"
      backgroundColor={color}
      borderTopWidth="1px"
      borderBottomWidth="1px"
      borderColor="gray.600"
      cursor="pointer"
      p={3}
      ref={ref}
      d="inline-block"
      pos="relative"
      _after={
        height && {
          zIndex: 1,
          content: '""',
          w: `${height}px`,
          h: `${height}px`,
          borderTop: '2px solid',
          borderTopColor: 'gray.600',
          borderRight: '2px solid',
          borderRightColor: 'gray.600',
          borderTopRightRadius: '8px',
          boxShadow: '4px -4px 6px 0px rgba(0,0,0,0.3);',
          right: `calc(${height}px / 2 * -1)`,
          top: '-1px',
          position: 'absolute',
          d: 'inline-block',
          transform: 'scale(0.707) rotate(45deg)',
          bgColor: color,
          pointerEvents: 'none',
        }
      }
      _notFirst={{
        pl: 12,
      }}
      _first={{
        borderLeftWidth: '1px',
      }}
    >
      <Popover isOpen={isOpen} onClose={handleCloseClick} placement={placement} closeOnBlur closeOnEsc>
        <PopoverTrigger>
          <Box>{triggerComponent}</Box>
        </PopoverTrigger>
        <Portal>
          <PopoverContent w="auto" maxWidth="xl">
            <PopoverHeader border={0}>{label}</PopoverHeader>
            <PopoverArrow />
            <PopoverCloseButton onClick={handleCloseClick} />
            <PopoverBody>{renderItems ? renderItems({ value, handleSelect }) : null}</PopoverBody>
            {renderFooter ? <PopoverFooter>{renderFooter()}</PopoverFooter> : null}
          </PopoverContent>
        </Portal>
      </Popover>
    </Box>
  );
}
