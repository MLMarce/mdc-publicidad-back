import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}
  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoryRepository.addCategory(createCategoryDto);
  }

  async findAll() {
    return await this.categoryRepository.getAll();
  }

  async findOne(id: string) {
    return await this.categoryRepository.getCategoryById(id);
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryRepository.updateCategory(id, updateCategoryDto);
  }

  async remove(id: string) {
    return await this.categoryRepository.removeCategory(id);
  }
}
