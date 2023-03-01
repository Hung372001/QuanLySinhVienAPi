import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { Class, Prisma } from '@prisma/client';

@Injectable()
export class ClassService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ClassCreateManyInput): Promise<Class> {
    return await this.prisma.class.create({
      data,
    });
  }

  async findAll() {
    const classList = await this.prisma.class.findMany({
      select: {
        id: true,
        name: true,
        Khoi: true,
        student: true,
      },
    });
    return { classList };
  }
  async findOne(id: string) {
    const classlist = await this.prisma.class.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        student: {
          orderBy: {
            userName: 'desc',
          },
        },
      },
    });
    return { classlist };
  }
  async update(params: {
    where: Prisma.ClassWhereUniqueInput;
    data: Prisma.ClassUpdateInput;
  }): Promise<Class> {
    const { data, where } = params;
    return this.prisma.class.update({
      data,
      where,
    });
  }
  async remove(id: string) {
    return await this.prisma.class.delete({
      where: { id },
    });
  }
}
