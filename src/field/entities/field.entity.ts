import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/category/entities/category.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'fields',
})
export class Field {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'Field ID',
    example: '123e4567-e89b-12d3-a456-426655440000',
    type: 'string',
  })
  id: string;
  @Column({ type: 'varchar' })
  @ApiProperty({
    description: 'Field name',
    example: 'fiel name example',
    type: 'string',
  })
  name: string;

  @ManyToOne(() => Category, (category) => category.fields)
  category: Category;
}
