import { Injectable } from '@nestjs/common';
import { CreateFieldDto } from './dto/create-field.dto';
import { FieldRepository } from './field.repository';

@Injectable()
export class FieldService {
  constructor(private readonly fieldRespository: FieldRepository) {}
  async createField(createFieldDto: CreateFieldDto) {
    return await this.fieldRespository.addField(createFieldDto);
  }

  findAll() {
    return `This action returns all field`;
  }

  findOne(id: number) {
    return `This action returns a #${id} field`;
  }

  update(id: number) {
    return `This action updates a #${id} field`;
  }

  remove(id: number) {
    return `This action removes a #${id} field`;
  }
}
