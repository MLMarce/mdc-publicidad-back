import { Injectable } from '@nestjs/common';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { FieldRepository } from 'src/field/field.repository';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly fieldRepository: FieldRepository,
  ) {}

  async addCategory(category: CreateCategoryDto): Promise<Category> {
    const foundCategory = await this.categoryRepository.findOne({
      where: { name: category.name },
    });
    if (foundCategory) {
      throw new Error(`Category with name ${category.name} already exists.`);
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
}
