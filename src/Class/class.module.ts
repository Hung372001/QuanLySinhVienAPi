/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';

@Module({
  imports: [],
  controllers: [ClassController],
  providers: [ClassService],
})
export class ClassModule {}
