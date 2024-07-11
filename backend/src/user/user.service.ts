import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';

interface Auth0User {
  sub: string;
  email: string;
  nickname: string;
}

@Injectable()
export class UserService {
  constructor(private readonly usersRepository: UserRepository) {}

  create(user: User) {
    return this.usersRepository.save(user);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findUserById(id: string) {
    return this.usersRepository.findOneBy({ id });
  }

  update(id: string, user: User) {
    return this.usersRepository.update(id, user);
  }

  delete(id: string) {
    return this.usersRepository.delete(id);
  }

  checkUser(user: Auth0User) {
    const exists = this.usersRepository.findOneBy({ id: user.sub });
    if (!exists) {
      const newUser = {
        id: user.sub,
        email: user.email,
        nickname: user.nickname,
      };

      this.create(newUser);
    }
  }
}
