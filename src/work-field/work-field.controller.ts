import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WorkFieldService } from './work-field.service';
import { CreateWorkFieldDto } from './dto/create-work-field.dto';
import { UpdateWorkFieldDto } from './dto/update-work-field.dto';

@Controller('work-field')
export class WorkFieldController {
  constructor(private readonly workFieldService: WorkFieldService) {}

  @Post()
  async create(@Body() createWorkFieldDto: CreateWorkFieldDto) {
    return await this.workFieldService.create(createWorkFieldDto);
  }

  @Get()
  async findAll() {
    return await this.workFieldService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.workFieldService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateWorkFieldDto: UpdateWorkFieldDto,
  ) {
    return await this.workFieldService.update(id, updateWorkFieldDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.workFieldService.remove(id);
  }
}
