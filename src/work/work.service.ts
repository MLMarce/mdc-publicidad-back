import { Injectable } from '@nestjs/common';
import { CreateWorkDto } from './dto/create-work.dto';
import { UpdateWorkDto } from './dto/update-work.dto';
import { WorkRepository } from './work.repository';

@Injectable()
export class WorkService {
  constructor(private readonly workRepository: WorkRepository) {}
  async create(createWorkDto: CreateWorkDto) {
    return await this.workRepository.createWork(createWorkDto);
  }

  async findAll() {
    return await this.workRepository.getAllWorks();
  }

  async findOne(id: string) {
    return await this.workRepository.getWorkById(id);
  }

  async update(id: string, updateWorkDto: UpdateWorkDto) {
    return await this.workRepository.updateWork(id, updateWorkDto);
  }

  async remove(id: string) {
    return await this.workRepository.deleteWork(id);
  }
}
