export function toUpperCase(args: string) {
  if (!args) {
    throw new Error('invalid arguments');
  }
  return args.toUpperCase();
}

export function toCharArray(args: string) {
  return Array.from(args);
}
