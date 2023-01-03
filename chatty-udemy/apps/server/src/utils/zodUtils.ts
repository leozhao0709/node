import { ZodIssue } from 'zod';

export function formatZodError(errors: ZodIssue[]) {
  console.log(errors);
  return errors.reduce((prev, curr, i) => {
    return `${prev} ${curr.path.join('.')} ${curr.message}${
      i === errors.length - 1 ? '.' : ';'
    }`;
  }, '');
}
