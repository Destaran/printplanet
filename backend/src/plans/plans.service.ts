import { Injectable } from '@nestjs/common';

@Injectable()
export class PlansService {
  async findAll() {
    return 'This action returns all plans';
  }
}
