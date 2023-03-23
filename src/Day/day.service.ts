/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateDayDto } from './dto/day-create.dto';
import { UpdateDayDto } from './dto/day-update.dto';
import { Prisma } from '@prisma/client';
@Injectable()
export class DayService {
  constructor(private prisma: PrismaService) {}
  async create(data: Prisma.DayCreateInput) {
    // const { name, scheduleId } = createMemuDto;
    // await this.prisma.day.create({
    //   data:{
    //     name:name
    //   },
    // });
    // return await this.prisma.day.create({
    //   data,
    // });
    console.log(data);
    return await this.prisma.day.create({ data });
  }

  async findAll() {
    const Days = await this.prisma.day.findMany({
      select: {
        id: true,
        name: true,
        subjectInDate: true,
      },
    });
    return { Days };
  }

  async findOne(id: string) {
    const Day = await this.prisma.day.findUnique({ where: { id } });
    return {
      select: {
        id: true,
        name: true,
        subjectInDate: true,
      },
    };
  }

  async update(id: string, updateMenuDto: UpdateDayDto) {
    const updateSlug = await this.prisma.day.update({
      where: { id },
      data: { ...updateMenuDto },
    });
    return { updateSlug };
  }

  async remove(id: string) {
    return await this.prisma.day.delete({
      where: { id },
    });
  }
}
