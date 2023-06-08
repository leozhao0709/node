export function toUpperCase(args: string) {
  if (args.length === 0) {
    throw new Error('Invalid arguments');
  }
  return args.toUpperCase();
}

export function toCharArray(args: string) {
  return Array.from(args);
}
