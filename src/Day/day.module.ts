import { DayController } from './day.controller';
import { DayService } from './day.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [DayController],
  providers: [DayService],
})
export class DayModule {}
