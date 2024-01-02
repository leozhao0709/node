export type ProgrammingLanguage = "Java" | "Golang" | "C";

type JavaOrC<T> = T extends "Java" | "C" ? T : never;

type test = JavaOrC<ProgrammingLanguage>;
// "Java" | "C"
