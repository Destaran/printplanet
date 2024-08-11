import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Plan } from './plans.entity';

@Injectable()
export class PlansRepository extends Repository<Plan> {
  constructor(dataSource: DataSource) {
    super(Plan, dataSource.createEntityManager());
  }
}
