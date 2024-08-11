import {
  Controller,
  Get,
  Param,
  UseGuards,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { PlansService } from './plans.service';
import { AuthGuard } from '@nestjs/passport';
import { PlanInput } from './plan-input.dto';

@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Get()
  findAll() {
    return this.plansService.findAll();
  }

  @Get(':id')
  find(@Param('id') id: number) {
    return this.plansService.find(id);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() plan: PlanInput) {
    return this.plansService.create(plan);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id') id, @Body('plan') plan) {
    return this.plansService.update(id, plan);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.plansService.delete(id);
  }
}
