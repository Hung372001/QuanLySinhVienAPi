/*
https://docs.nestjs.com/controllers#controllers
*/
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { ClassService } from './class.service';
import { Class as ClasskModel } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}
  @Post('')
  create(
    @Body()
    classData: {
      name: string;
      Khoi: string;
    },
  ): Promise<ClasskModel> {
    const { name, Khoi } = classData;
    return this.classService.create({
      name,
      Khoi,
    });
  }
  @Get()
  findAll() {
    return this.classService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classService.findOne(id);
  }
  @Get('students/:name')
  getStudent(@Param('name') name: string) {
    return this.classService.getStudentbyClass(name);
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    ClassNameData: {
      name: string;
    },
  ): Promise<ClasskModel> {
    const { name } = ClassNameData;
    return this.classService.update({
      where: { id },
      data: {
        ...ClassNameData,
      },
    });
  }
}
