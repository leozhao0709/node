type Post = {
  id: number;
  body: string;
  ts: Date;
};

export const bla = <Key extends keyof Post>(
  key: Key,
  value: Post[Key]
): Post[Key] => {
  if (key === "ts") {
    return new Date();
  }

  return value;
};
