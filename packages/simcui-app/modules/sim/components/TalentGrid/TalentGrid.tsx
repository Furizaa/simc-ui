import { Grid } from '@chakra-ui/core';
import React, { useMemo } from 'react';
import talentDb from '@dbc/dbTalentList.json';
import { uniqWith } from 'lodash';

type RenderCellProps = {
  spellId: number;
  talentId: number;
};

export interface TalentGridProps {
  specId: number;
  characterClassId: number;
  renderCell: (renderProps: RenderCellProps) => React.ReactNode;
}

export default function TalentGrid({ specId, characterClassId, renderCell }: TalentGridProps) {
  const talentsForSpec = useMemo(
    () =>
      Object.values(talentDb).filter(
        talent => 'playable_specialization' in talent && talent.playable_specialization.id === specId,
      ),

    [specId],
  );

  const talentsForClass = useMemo(
    () =>
      Object.values(talentDb).filter(
        talent => talent.playable_class.id === characterClassId && !('playable_specialization' in talent),
      ),

    [characterClassId],
  );

  // Merge talents for spec with talents for class and the check if
  // there is any overlap on the 'grid slot' the talent should fit into.
  // We always should prefer the spec talent over the class talent if there
  // is an overlap.
  const talents = uniqWith(
    [...talentsForSpec, ...talentsForClass],
    (a, b) => a.tier_index === b.tier_index && a.column_index === b.column_index,
  ).sort((a, b) => {
    if (a.tier_index > b.tier_index) return 1;
    if (a.tier_index < b.tier_index) return -1;
    if (a.column_index > b.column_index) return 1;
    if (a.column_index < b.column_index) return -1;
    return 0;
  });

  return (
    <Grid templateColumns="1fr 1fr 1fr" gap={2}>
      {talents.map(talent => renderCell({ spellId: talent.spell.id, talentId: talent.id }))}
    </Grid>
  );
}
