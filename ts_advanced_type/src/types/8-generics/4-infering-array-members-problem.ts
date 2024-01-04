const buildStat = <T extends string[]>(stats: T) => {
  return stats;
};

export const stats = buildStat(['PENDING', 'FAILED', 'SUCCESS']);
