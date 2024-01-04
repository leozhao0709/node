const buildStat = <T extends string>(stats: T[]) => {
  return stats.map<`set${T}`>((d) => `set${d}`);
  // return stats;
};

export const stats = buildStat(['PENDING', 'FAILED', 'SUCCESS']);
