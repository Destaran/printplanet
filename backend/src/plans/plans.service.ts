import { Injectable } from '@nestjs/common';

@Injectable()
export class PlansService {
  findAll() {
    return 'This action returns all plans';
  }

  find(id: number) {
    return `This action returns the plan with id: ${id}`;
  }

  create(plan) {
    return `This action creates a new plan`;
  }

  update(id: number, plan) {
    return `This action updates the plan with id: ${id}`;
  }

  delete(id: number) {
    return `This action removes the plan with id: ${id}`;
  }
}
