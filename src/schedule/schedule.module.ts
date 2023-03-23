import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [ScheduleController],
  providers: [ScheduleService],
})
export class ScheduleModule {}
