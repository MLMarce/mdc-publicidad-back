import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Work } from './entities/work.entity';
import { Repository } from 'typeorm';
import { CreateWorkDto } from './dto/create-work.dto';
import { Category } from 'src/category/entities/category.entity';
import { WorkField } from 'src/work-field/entities/work-field.entity';
import { UpdateWorkDto } from './dto/update-work.dto';

@Injectable()
export class WorkRepository {
  constructor(
    @InjectRepository(Work) private readonly workRepository: Repository<Work>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(WorkField)
    private readonly workFieldsRepository: Repository<WorkField>,
  ) {}

  async getAllWorks(): Promise<Work[]> {
    const works = await this.workRepository.find();
    return works;
  }

  async getWorkById(id: string): Promise<Work> {
    return await this.workRepository.findOneBy({ id });
  }

  async createWork(work: CreateWorkDto): Promise<Work> {
    const workCategory = await this.categoryRepository.findOne({
      where: { name: work.category },
    });

    if (!workCategory) throw new BadRequestException('Invalid category');

    const createdWork = new Work();

    const findWorkFields = await this.workFieldsRepository.find({
      where: { work: createdWork },
    });

    createdWork.name = work.name;
    createdWork.description = work.description;
    createdWork.category = workCategory;
    createdWork.workFields = findWorkFields;
    return await this.workRepository.save(createdWork);
  }

  async updateWork(id: string, work: UpdateWorkDto): Promise<Work> {
    const updatedWork = await this.workRepository.findOneBy({ id });
    if (!updatedWork) throw new BadRequestException('Work not found');

    if (work.name) {
      updatedWork.name = work.name;
    }
    if (work.description) {
      updatedWork.description = work.description;
    }
    if (work.category) {
      const workCategory = await this.categoryRepository.findOne({
        where: { name: work.category },
      });
      if (!workCategory) throw new BadRequestException('Invalid category');
      updatedWork.category = workCategory;
      return await this.workRepository.save(updatedWork);
    }
  }
  async deleteWork(id: string): Promise<string> {
    const workToDelete = await this.workRepository.findOneBy({ id });
    if (!workToDelete) throw new BadRequestException('Work not found');

    const foundWorkFields = await this.workFieldsRepository.find({
      where: { work: workToDelete },
    });
    foundWorkFields.forEach(async (workField) => {
      await this.workFieldsRepository.delete(workField.id);
    });
    await this.workRepository.delete(id);
    return 'Work delete successfully';
  }
}
