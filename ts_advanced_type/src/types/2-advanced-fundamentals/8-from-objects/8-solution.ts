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

type ProgrammingLanguage = keyof typeof programmingLanguages;
