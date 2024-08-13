import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorkFieldService } from './work-field.service';
import { CreateWorkFieldDto } from './dto/create-work-field.dto';
import { UpdateWorkFieldDto } from './dto/update-work-field.dto';

@Controller('work-field')
export class WorkFieldController {
  constructor(private readonly workFieldService: WorkFieldService) {}

  @Post()
  create(@Body() createWorkFieldDto: CreateWorkFieldDto) {
    return this.workFieldService.create(createWorkFieldDto);
  }

  @Get()
  findAll() {
    return this.workFieldService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workFieldService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkFieldDto: UpdateWorkFieldDto) {
    return this.workFieldService.update(+id, updateWorkFieldDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workFieldService.remove(+id);
  }
}
