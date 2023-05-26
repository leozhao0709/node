import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { UserSeeder } from './user/UserSeeder.js';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    this.call(em, [UserSeeder]);
  }
}
