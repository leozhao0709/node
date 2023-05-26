import { Factory, Faker } from '@mikro-orm/seeder';
import { EntityData } from '@mikro-orm/core';
import { User } from '../../../users/user.entity.js';

export class UserFactory extends Factory<User> {
  model = User;

  protected definition(faker: Faker): EntityData<User> {
    return {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
  }
}
