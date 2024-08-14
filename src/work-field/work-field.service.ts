import { Injectable } from '@nestjs/common';
import { CreateWorkFieldDto } from './dto/create-work-field.dto';
import { UpdateWorkFieldDto } from './dto/update-work-field.dto';
import { WorkFieldRepository } from './work-field.repository';

@Injectable()
export class WorkFieldService {
  constructor(private readonly workFieldRepository: WorkFieldRepository) {}
  async create(createWorkFieldDto: CreateWorkFieldDto) {
    return await this.workFieldRepository.create(createWorkFieldDto);
  }

  async findAll() {
    return await this.workFieldRepository.findAll();
  }

  async findOne(id: string) {
    return await this.workFieldRepository.findOne(id);
  }

  async update(id: string, updateWorkFieldDto: UpdateWorkFieldDto) {
    return await this.update(id, updateWorkFieldDto);
  }

  async remove(id: string) {
    return await this.workFieldRepository.remove(id);
  }
}
