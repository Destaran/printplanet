import { Injectable } from '@nestjs/common';
import { Plan } from './plans.entity';
import { PlansRepository } from './plans.repository';

@Injectable()
export class PlansService {
  constructor(private readonly plans: PlansRepository) {}

  findAll() {
    return this.plans.find({
      order: { id: 'ASC' },
    });
  }

  find(id: string) {
    return this.plans.findOneBy({ id });
  }

  create(plan: Plan) {
    return this.plans.save(plan);
  }

  update(id: string, _plan: Plan) {
    return `This action updates the plan with id: ${id}`;
  }

  delete(id: string) {
    return `This action removes the plan with id: ${id}`;
  }
}
