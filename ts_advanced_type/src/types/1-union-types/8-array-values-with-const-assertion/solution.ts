const languages = ['java', 'c', 'go'] as const;

type Languages = typeof languages;

type JavaOrGo = Languages[0 | 2]; // "java" | "go"
type Languages = Languages[number]; // "java" | "c" | "go"

export {};
