import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@Injectable()
export class ClassService {
  constructor(private prisma: PrismaService) {}

  async create(createMemuDto: CreateClassDto) {
    const { name } = createMemuDto;
    await this.prisma.class.create({
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

  async update(id: string, updateMenuDto: UpdateClassDto) {
    const updateSlug = await this.prisma.class.update({
      where: { id },
      data: { ...updateMenuDto },
    });
    return { updateSlug };
  }

  async remove(name: string) {
    return await this.prisma.class.delete({
      where: { name },
    });
  }
}
