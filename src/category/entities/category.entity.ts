import { ApiProperty } from '@nestjs/swagger';
import { Field } from 'src/field/entities/field.entity';
import { Work } from 'src/work/entities/work.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'categories',
})
export class Category {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'Category ID',
    example: '123e4567-e89b-12d3-a456-426655440000',
    type: 'string',
  })
  id: string;
  @Column({ type: 'varchar' })
  @ApiProperty({
    description: 'Category name',
    example: 'work name example',
    type: 'string',
  })
  name: string;

  @OneToMany(() => Field, (field) => field.category)
  fields: Field[];

  @OneToMany(() => Work, (work) => work.category)
  works: Work[];
}
