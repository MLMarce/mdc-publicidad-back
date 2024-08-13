import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { FieldRepository } from 'src/field/field.repository';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Field } from 'src/field/entities/field.entity';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly fieldRepository: FieldRepository,
    @InjectRepository(Field)
    private readonly fieldRepositoryDB: Repository<Field>,
  ) {}

  async addCategory(category: CreateCategoryDto): Promise<Category> {
    const foundCategory = await this.categoryRepository.findOne({
      where: { name: category.name },
    });
    if (foundCategory) {
      throw new BadRequestException(
        `Category with name ${category.name} already exists.`,
      );
    }
    const newCategory = new Category();
    newCategory.name = category.name;
    const createdCategory = await this.categoryRepository.save(newCategory);
    if (category.fields.length) {
      await Promise.all(
        category.fields.map((field) => {
          return this.fieldRepository.addField({
            name: field,
            categoryId: createdCategory.id,
          });
        }),
      );
    }
    return createdCategory;
  }

  async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found.`);
    }
    if (updateCategoryDto.name) {
      category.name = updateCategoryDto.name;
    }
    if (updateCategoryDto.fields) {
      await Promise.all(
        updateCategoryDto.fields.map(async (fieldName) => {
          const foundField = await this.fieldRepositoryDB.findOne({
            where: { name: fieldName, category: category },
          });
          if (foundField) {
            return foundField;
          }
          const newField = await this.fieldRepository.addField({
            name: fieldName,
            categoryId: category.id,
          });
          return newField;
        }),
      );
    }
    return this.categoryRepository.save(category);
  }

  async removeCategory(id: string) {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: { fields: true },
    });
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found.`);
    }
    try {
      await Promise.all(
        category.fields.map(async (field) => {
          const fieldDeleted = await this.fieldRepositoryDB.delete(field.id);
          if (!fieldDeleted.affected) {
            throw new BadRequestException(
              `Error to delete Field with id ${field.id}.`,
            );
          }
          return 'field deleted successfully';
        }),
      );
      await this.categoryRepository.delete(category.id);
      return 'category removed successfully';
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err);
    }
  }
}
