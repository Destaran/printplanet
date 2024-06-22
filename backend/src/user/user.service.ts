import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  findAll() {
    return 'This action returns all users';
  }

  find(id: number) {
    return `This action returns the user with id: ${id}`;
  }

  create(user) {
    return `This action creates a new user`;
  }

  update(id: number, user) {
    return `This action updates the user with id: ${id}`;
  }

  delete(id: number) {
    return `This action removes the user with id: ${id}`;
  }
}
