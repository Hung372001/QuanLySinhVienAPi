/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { Prisma, schedule } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ScheduleService {
  constructor(private prisma: PrismaService) {}
  async create(data: Prisma.scheduleCreateManyInput): Promise<schedule> {
    return await this.prisma.schedule.create({
      data,
    });
  }
  async getAll() {
    return await this.prisma.schedule.findMany({
      select: {
        id: true,
        name: true,
        scheduleDay: {
          select: {
            id: true,
            name: true,
            subjectInDate: {
              select: {
                id: true,
                subjectName: true,
                time: true,
              },
            },
          },
        },
      },
    });
  }
}
