export type ProgrammingLanguage = "Java" | "Golang" | "C";

type JavaOrC = ProgrammingLanguage extends "Java" | "C" ? "Java" | "C" : never;

// "Java" | "C"
