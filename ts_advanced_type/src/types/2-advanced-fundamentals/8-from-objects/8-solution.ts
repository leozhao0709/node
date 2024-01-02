export const programmingLanguages = {
  python: {
    name: 'Python',
  },
  java: {
    name: 'Java',
  },
  golang: {
    name: 'Golang',
  },
};

type UpperCaseUnion<T> = T extends string ? Capitalize<T> : never;

type ProgrammingLanguage = UpperCaseUnion<keyof typeof programmingLanguages>;
