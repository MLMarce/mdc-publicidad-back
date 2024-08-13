import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FieldService } from './field.service';
import { CreateFieldDto } from './dto/create-field.dto';

@Controller('field')
export class FieldController {
  constructor(private readonly fieldService: FieldService) {}

  @Post()
  async createField(@Body() createFieldDto: CreateFieldDto) {
    return await this.fieldService.createField(createFieldDto);
  }

  @Get()
  findAll() {
    return this.fieldService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fieldService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.fieldService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fieldService.remove(+id);
  }
}
