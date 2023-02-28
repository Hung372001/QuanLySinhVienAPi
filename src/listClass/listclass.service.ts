import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

import { CreateListClassDto } from './dto/create-listClass.dto';
import { UpdateListClassDto } from './dto/update-listClass.dto';

@Injectable()
export class ListClassService {
  constructor(private prisma: PrismaService) {}

  async create(createMemuDto: CreateListClassDto) {
    const { name } = createMemuDto;
    await this.prisma.listClass.create({
      data: {
        name,
      },
    });
    return { message: 'tao thanh cong' };
  }

  async findAll() {
    const Menu = await this.prisma.class.findMany({
      select: { id: true, name: true },
    });
    return { Menu };
  }

  async findOne(id: string) {
    const Class = await this.prisma.menu.findUnique({ where: { id } });
    return { Class };
  }

  async update(id: string, updateMenuDto: UpdateListClassDto) {
    const updateSlug = await this.prisma.class.update({
      where: { id },
      data: { ...updateMenuDto },
    });
    return { updateSlug };
  }
  async getListClass(name: string) {
    const classList = await this.prisma.listClass.findMany({
      where: { name },
      select: { id: true, name: true, class: true },
    });
    return { classList };
  }
  async remove(name: string) {
    return await this.prisma.class.delete({
      where: { name },
    });
  }
}
