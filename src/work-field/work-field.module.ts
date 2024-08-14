import { Module } from '@nestjs/common';
import { WorkFieldService } from './work-field.service';
import { WorkFieldController } from './work-field.controller';
import { WorkFieldRepository } from './work-field.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkField } from './entities/work-field.entity';
import { Work } from 'src/work/entities/work.entity';
import { Field } from 'src/field/entities/field.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkField, Work, Field])],
  controllers: [WorkFieldController],
  providers: [WorkFieldService, WorkFieldRepository],
})
export class WorkFieldModule {}
