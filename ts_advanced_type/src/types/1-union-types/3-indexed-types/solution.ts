const values = {
  UUID: 'uuid',
  Int: 23,
  String: 'A String.',
  Boolean: false,
};

type Values = typeof values;

type UUIDType = Values['UUID'];
type IntType = Values['Int'];
type StringType = Values['String'];
type BooleanType = Values['Boolean'];

export {};
