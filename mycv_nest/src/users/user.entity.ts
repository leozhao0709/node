import {
  BaseEntity,
  Entity,
  OptionalProps,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';

@Entity()
export class User extends BaseEntity<User, 'id'> {
  [OptionalProps]!: 'createdAt' | 'updatedAt';

  @PrimaryKey()
  id!: number;

  @Property()
  @Unique()
  email!: string;

  @Property()
  password!: string;

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Property({ onCreate: () => new Date() })
  createdAt: Date = new Date();

  // @BeforeCreate()
  // beforeCreate() {
  //   console.log('---before create---');
  // }
}
