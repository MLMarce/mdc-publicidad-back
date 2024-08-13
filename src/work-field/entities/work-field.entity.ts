import { ApiProperty } from '@nestjs/swagger';
import { Field } from 'src/field/entities/field.entity';
import { Work } from 'src/work/entities/work.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'workfields',
})
export class WorkField {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'WorkField ID',
    example: '123e4567-e89b-12d3-a456-426655440000',
    type: 'string',
  })
  id: string;

  @ManyToOne(() => Work, (work) => work.workFields)
  work: Work;

  @ManyToOne(() => Field)
  field: Field;

  @Column('text')
  value: string;
}
