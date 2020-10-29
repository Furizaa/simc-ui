import { Grid } from '@chakra-ui/core';
import React, { useMemo } from 'react';
import talentDb from '@dbc/dbTalentList.json';

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
      Object.values(talentDb)
        .filter((talent) =>
          'playable_specialization' in talent
            ? talent.playable_specialization.id === specId
            : talent.playable_class.id === characterClassId,
        )
        .sort((a, b) => {
          if (a.tier_index > b.tier_index) return 1;
          if (a.tier_index < b.tier_index) return -1;
          if (a.column_index > b.column_index) return 1;
          if (a.column_index < b.column_index) return -1;
          return 0;
        }),
    [specId, characterClassId],
  );

  return (
    <Grid templateColumns="1fr 1fr 1fr" gap={2}>
      {talentsForSpec.map((talent) => renderCell({ spellId: talent.spell.id, talentId: talent.id }))}
    </Grid>
  );
}
