/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { Prisma, Score } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ScoreService {
  constructor(private prisma: PrismaService) {}
  async createScore(data: Prisma.ScoreCreateInput): Promise<Score> {
    return await this.prisma.score.create({
      data,
    });
  }
}
