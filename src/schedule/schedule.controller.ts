/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post } from '@nestjs/common';
import { ScheduleService } from './schedule.service';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}
  @Post('')
  create(@Body() shedule: { name: string; ClassName: string }) {
    const { name, ClassName } = shedule;

    return this.scheduleService.create({
      name,
      ClassName,
    });
  }
  @Get('')
  getAll() {
    return this.scheduleService.getAll();
  }
}
