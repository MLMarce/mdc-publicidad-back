import { Injectable } from '@nestjs/common';
import { CreateWorkFieldDto } from './dto/create-work-field.dto';
import { UpdateWorkFieldDto } from './dto/update-work-field.dto';

@Injectable()
export class WorkFieldService {
  create(createWorkFieldDto: CreateWorkFieldDto) {
    return 'This action adds a new workField';
  }

  findAll() {
    return `This action returns all workField`;
  }

  findOne(id: number) {
    return `This action returns a #${id} workField`;
  }

  update(id: number, updateWorkFieldDto: UpdateWorkFieldDto) {
    return `This action updates a #${id} workField`;
  }

  remove(id: number) {
    return `This action removes a #${id} workField`;
  }
}
