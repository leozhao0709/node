type TemplateLiteralKeys = `${'id' | 'title' | 'author'}`;

type ObjWithKeys = {
  [k in TemplateLiteralKeys as Uppercase<k>]: string;
}; //{ID: string, TITLE: string, AUTHOR: string}

export {};
