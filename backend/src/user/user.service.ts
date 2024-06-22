import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private readonly usersRepository: UserRepository) {}

  findAll() {
    return this.usersRepository.find();
  }

  findUserById(id: string) {
    return this.usersRepository.findOneBy({ id });
  }

  create(user: User) {
    return this.usersRepository.save(user);
  }

  update(id: string, user: User) {
    return this.usersRepository.update(id, user);
  }

  delete(id: string) {
    return this.usersRepository.delete(id);
  }
}
