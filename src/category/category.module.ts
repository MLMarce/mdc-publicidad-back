import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryRepository } from './category.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { FieldModule } from 'src/field/field.module';
import { Field } from 'src/field/entities/field.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Field]), FieldModule],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository],
})
export class CategoryModule {}
