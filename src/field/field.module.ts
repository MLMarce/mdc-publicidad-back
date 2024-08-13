import { Module } from '@nestjs/common';
import { FieldService } from './field.service';
import { FieldController } from './field.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Field } from './entities/field.entity';
import { Category } from 'src/category/entities/category.entity';
import { FieldRepository } from './field.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Field, Category])],
  controllers: [FieldController],
  providers: [FieldService, FieldRepository],
  exports: [FieldRepository],
})
export class FieldModule {}
