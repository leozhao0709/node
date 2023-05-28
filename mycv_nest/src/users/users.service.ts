import { EntityRepository } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/mysql';
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { UpdateUserDto } from './dto/UpdateUser.dto';

const Transactional = (): MethodDecorator => {
  return function (
    target: object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value;
    descriptor.value = async function (...args: unknown[]) {
      const em = this.em.fork();
      try {
        await em.begin();
        const returnValue = await original.call(this, ...args);

        em.commit();
        return returnValue;
      } catch (error) {
        await em.rollback();
        throw error;
      }
    };
  };
};

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: EntityRepository<User>,
    private readonly em: EntityManager
  ) {}

  @Transactional()
  async create() {
    const user = this.userRepo.create({
      password: 'test',
      email: 'email2.com',
    });

    await this.em.flush();

    return user;
  }

  async deleteOne(id: number) {
    // // simple delete
    // return await this.em.nativeDelete(User, { id });

    // delete with flush.
    const userRef = this.em.getReference(User, id); // this won't trigger select
    await this.em.removeAndFlush(userRef);
    return userRef;
  }

  async updateOne(id: number, updateUserDto: UpdateUserDto) {
    // // simple update
    // return await this.em.nativeUpdate(
    //   User,
    //   { id },
    //   { email: 'newEmail@email.com' }
    // );

    // // update with flush
    // const userRef = this.em.getReference(User, id);
    // userRef.username = 'test123';
    // await this.em.flush();
    // return userRef;

    const user = this.em
      .getReference(User, id)
      .assign(updateUserDto, { mergeObjects: true });
    await this.em.flush();
    return user;
  }

  async getOne(id: number) {
    const user = await this.userRepo.findOne(
      {
        id,
      }
      // { fields: ['email'] }
    );

    return user;
  }
}
