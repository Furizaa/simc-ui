import { Box, Heading, HStack, IconButton, Text } from '@chakra-ui/core';
import { CheckCircleIcon, DownloadIcon } from '@chakra-ui/icons';
import React from 'react';
import { ExecutableOption } from '../../../../types';
import SimcExecutableCardStageDisplay, { SimcExecutableCardProcessingStage } from './SimcExecutableCardStageDisplay';

export interface SimcExecutableCardContentProps {
  executable: ExecutableOption;
  onDownloadClick?: () => void;
  config: SimcExecutableCardProcessingStage;
}

export default function SimcExecutableCardContent({
  executable,
  onDownloadClick,
  config,
}: SimcExecutableCardContentProps) {
  const { stage } = config;

  const handleDownloadClick = () => {
    if (onDownloadClick) {
      onDownloadClick();
    }
  };

  return (
    <HStack spacing={3} align="flex-start">
      {stage === 'ready' ? (
        <Box p={2}>
          <CheckCircleIcon color="green.400" boxSize={6} />
        </Box>
      ) : (
        <IconButton
          fontSize="lg"
          isLoading={stage === 'downloading' || stage === 'unpacking'}
          disabled={stage === 'unknown' || stage === 'downloading' || stage === 'unpacking'}
          aria-label="download"
          size="md"
          icon={<DownloadIcon />}
          onClick={handleDownloadClick}
          colorScheme="indigo"
        />
      )}
      <Box>
        <Box>
          <Heading size="sm" as="span">{`SimC ${executable.semver}  `}</Heading>
          <Text as="strong" color={executable.wowverColor} variant="bold">
            {executable.wowverDisplay}
          </Text>
        </Box>
        <Text fontSize="xs">{`World of Warcraft ${executable.wowver}`}</Text>
        <Box mt={1} minH={5}>
          <SimcExecutableCardStageDisplay config={config} />
        </Box>
      </Box>
    </HStack>
  );
}
