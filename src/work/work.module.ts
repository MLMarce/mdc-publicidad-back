import { Module } from '@nestjs/common';
import { WorkService } from './work.service';
import { WorkController } from './work.controller';
import { WorkRepository } from './work.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Work } from './entities/work.entity';
import { WorkField } from 'src/work-field/entities/work-field.entity';
import { Category } from 'src/category/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Work, WorkField, Category])],
  controllers: [WorkController],
  providers: [WorkService, WorkRepository],
})
export class WorkModule {}
