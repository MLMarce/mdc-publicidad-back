import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/category/entities/category.entity';
import { WorkField } from 'src/work-field/entities/work-field.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'works',
})
export class Work {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'Work ID',
    example: '123e4567-e89b-12d3-a456-426655440000',
    type: 'string',
  })
  id: string;
  @Column({ type: 'varchar' })
  @ApiProperty({
    description: 'Work name',
    example: 'work name example',
    type: 'string',
  })
  name: string;

  @Column({ type: 'varchar' })
  @ApiProperty({
    description: 'Description work',
    example: 'description work example',
    type: 'string',
  })
  description: string;

  @ManyToOne(() => Category, (category) => category.jobs)
  category: Category;

  @OneToMany(() => WorkField, (workField) => workField.work, { cascade: true })
  workFields: WorkField[];
}
