/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { Prisma, subjectInDate } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class SubjectinDateService {
  constructor(private prisma: PrismaService) {}
  async create(data: Prisma.subjectInDateCreateInput): Promise<subjectInDate> {
    return await this.prisma.subjectInDate.create({
      data,
    });
  }
}
