const bulidStat = <T extends string[]>(stats: T) => {
  return stats;
};

export const stats = bulidStat(["PENDING", "FAILED", "SUCCESS"]);
