import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Field } from './entities/field.entity';
import { Repository } from 'typeorm';
import { CreateFieldDto } from './dto/create-field.dto';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class FieldRepository {
  constructor(
    @InjectRepository(Field)
    private readonly fieldRepository: Repository<Field>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}
  async addField(field: CreateFieldDto): Promise<Field> {
    const category = await this.categoryRepository.findOne({
      where: { id: field.categoryId },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    const newField = new Field();
    newField.name = field.name;
    newField.category = category;

    const createdField = await this.fieldRepository.save(newField);
    if (!createdField) {
      throw new BadRequestException('Failed to create field');
    }

    return createdField;
  }
}
