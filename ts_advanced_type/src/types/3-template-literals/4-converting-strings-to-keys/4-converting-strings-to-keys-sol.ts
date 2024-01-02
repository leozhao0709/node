type TemplateLiteralKeys = `${"id" | "title" | "author"}`;

type ObjWithKeys = Record<TemplateLiteralKeys, string>;
type ObjWithUppercaseKeys = Record<Uppercase<TemplateLiteralKeys>, string>;
