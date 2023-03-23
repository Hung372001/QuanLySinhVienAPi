/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post } from '@nestjs/common';
import { SubjectinDateService } from './subjectindate.service';
import { subjectInDate } from '@prisma/client';

@Controller('subjectInDate')
export class SubjectInDateController {
  constructor(private readonly subjectInDateSevice: SubjectinDateService) {}
  @Post('')
  create(
    @Body() subjectInDate: { subjectName: string; time: string; dayId: string },
  ): Promise<subjectInDate> {
    const { subjectName, time, dayId } = subjectInDate;
    return this.subjectInDateSevice.create({
      Subject: {
        connect: {
          name: subjectName,
        },
      },
      time,
      Day: {
        connect: {
          id: dayId,
        },
      },
    });
  }
}
