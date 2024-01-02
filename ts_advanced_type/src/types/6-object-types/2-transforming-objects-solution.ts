interface Obj {
  username: string;
  email: string;
  role: number;
}

type ObjSetters = {
  [K in keyof Obj as `set${Capitalize<K>}`]: () => void;
};

/*
{
  setUsername: () => void;
  setEmail: () => void;
  setRole: () => void;
}
*/
