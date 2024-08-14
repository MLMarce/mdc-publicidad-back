import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkField } from './entities/work-field.entity';
import { Repository } from 'typeorm';
import { UpdateWorkFieldDto } from './dto/update-work-field.dto';
import { CreateWorkFieldDto } from './dto/create-work-field.dto';
import { Field } from 'src/field/entities/field.entity';
import { Work } from 'src/work/entities/work.entity';

@Injectable()
export class WorkFieldRepository {
  constructor(
    @InjectRepository(WorkField)
    private readonly workFieldRepository: Repository<WorkField>,
    @InjectRepository(Field)
    private readonly fieldRepository: Repository<Field>,
    @InjectRepository(Work)
    private readonly workRepository: Repository<Work>,
  ) {}

  async create(workField: CreateWorkFieldDto): Promise<WorkField> {
    if (!workField) throw new BadRequestException('workField is required');
    const field = await this.fieldRepository.findOneBy({
      id: workField.field_id,
    });
    if (!field) throw new NotFoundException('Field not found');
    const work = await this.workRepository.findOneBy({ id: workField.work_id });
    if (!work) throw new NotFoundException('Work not found');

    const newWorkField = new WorkField();
    newWorkField.value = workField.value;
    newWorkField.field = field;
    newWorkField.work = work;
    const createdWorkField = await this.workFieldRepository.save(newWorkField);
    if (!createdWorkField)
      throw new BadRequestException('Error saving work field');
    return createdWorkField;
  }
  async findAll(): Promise<WorkField[]> {
    const workFields = await this.workFieldRepository.find();
    return workFields;
  }
  async findOne(id: string): Promise<WorkField> {
    const workField = await this.workFieldRepository.findOneBy({ id });
    if (!workField) {
      throw new NotFoundException('WorkField not found');
    }
    return workField;
  }
  async remove(id: string): Promise<void> {
    const workField = await this.workFieldRepository.findOneBy({ id });
    if (!workField) {
      throw new NotFoundException('WorkField not found');
    }
    await this.workFieldRepository.delete(id);
  }
  async update(id: string, workField: UpdateWorkFieldDto): Promise<string> {
    const foundWorkField = await this.workFieldRepository.findOneBy({ id });
    if (!foundWorkField) {
      throw new NotFoundException('WorkField not found');
    }
    if (workField.value) foundWorkField.value = workField.value;
    await this.workFieldRepository.update(id, foundWorkField);
    return 'WorkField updated successfully';
  }
}
