import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

import { CreateListClassDto } from './dto/create-listClass.dto';
import { UpdateListClassDto } from './dto/update-listClass.dto';

@Injectable()
export class ListClassService {
  constructor(private prisma: PrismaService) {}

  async create(createListDto: CreateListClassDto) {
    const { name } = createListDto;
    await this.prisma.listClass.create({
      data: {
        name,
      },
    });
    return { message: 'tao thanh cong' };
  }

  async findAll() {
    const list = await this.prisma.listClass.findMany({
      select: { id: true, name: true },
    });
    return { list };
  }

  async findOne(id: string) {
    const Class = await this.prisma.listClass.findUnique({ where: { id } });
    return { Class };
  }

  async update(id: string, updateMenuDto: UpdateListClassDto) {
    const updateSlug = await this.prisma.listClass.update({
      where: { id },
      data: { ...updateMenuDto },
    });
    return { updateSlug };
  }
  async getListClass(name: string) {
    const list = await this.prisma.listClass.findMany({
      where: { name },
      select: { class: true },
    });
  }
  async remove(name: string) {
    return await this.prisma.listClass.delete({
      where: { name },
    });
  }
}
