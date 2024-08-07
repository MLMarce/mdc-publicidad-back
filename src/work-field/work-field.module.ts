import { Module } from '@nestjs/common';
import { WorkFieldService } from './work-field.service';
import { WorkFieldController } from './work-field.controller';

@Module({
  controllers: [WorkFieldController],
  providers: [WorkFieldService],
})
export class WorkFieldModule {}
