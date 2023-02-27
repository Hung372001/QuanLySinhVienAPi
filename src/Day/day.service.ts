/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateDayDto } from './dto/day-create.dto';
import { UpdateDayDto } from './dto/day-update.dto';
@Injectable()
export class DayService {
  constructor(private prisma: PrismaService) {}
  async create(createMemuDto: CreateDayDto) {
    const { name } = createMemuDto;
    await this.prisma.day.create({
      data: {
        name,
      },
    });
    return { message: 'tao thanh cong' };
  }

  async findAll() {
    const Menu = await this.prisma.day.findMany({
      select: { id: true, name: true },
    });
    return { Menu };
  }

  async findOne(id: string) {
    const Class = await this.prisma.day.findUnique({ where: { id } });
    return { Class };
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
