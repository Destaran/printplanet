import { OmitType } from '@nestjs/mapped-types';
import { Plan } from './plans.entity';

export class PlanInput extends OmitType(Plan, ['id'] as const) {}
