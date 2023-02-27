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
} from '@nestjs/common';
import { DayService } from './day.service';
import { CreateDayDto } from 'src/Day/dto/day-create.dto';
import { UpdateDayDto } from 'src/Day/dto/day-update.dto';

@Controller('day')
export class DayController {
  constructor(private readonly dayService: DayService) {}

  @Post()
  create(@Body() createBiaDto: CreateDayDto) {
    return this.dayService.create(createBiaDto);
  }

  @Get()
  findAll() {
    return this.dayService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dayService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBiaDto: UpdateDayDto) {
    return this.dayService.update(id, updateBiaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dayService.remove(id);
  }
}
