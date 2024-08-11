import { Injectable } from '@nestjs/common';
import { Plan } from './plans.entity';
import { PlansRepository } from './plans.repository';
import { PlanInput } from './plan-input.dto';

@Injectable()
export class PlansService {
  constructor(private readonly plans: PlansRepository) {}

  async findAll() {
    return this.plans.find({
      order: { id: 'ASC' },
    });
  }

  async findById(id: number) {
    return this.plans.findOneBy({ id });
  }

  async findAllByOwnerId(ownerId: string) {
    return this.plans.findBy({ ownerId });
  }

  async create(plan: PlanInput) {
    const newPlan = this.plans.create(plan);
    return this.plans.save(newPlan);
  }

  async update(id: number, _plan: Plan) {
    return `This action updates the plan with id: ${id}`;
  }

  async delete(id: number) {
    return `This action removes the plan with id: ${id}`;
  }
}
