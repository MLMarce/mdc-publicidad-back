import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/enums/roles.enum';
import { UserStatus } from 'src/enums/user-status.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'User ID',
    example: '123e4567-e89b-12d3-a456-426655440000',
    type: 'string',
  })
  id: string;

  @Column({ type: 'varchar' })
  @ApiProperty({
    description: 'User name',
    example: 'John Doe',
    type: 'string',
  })
  name: string;

  @Column({ type: 'varchar' })
  @ApiProperty({
    description: 'User email',
    example: 'john.doe@example.com',
    type: 'string',
  })
  email: string;

  @Column({ type: 'varchar' })
  @ApiProperty({
    description: 'User password',
    example: '$2b$10$...hash...',
    type: 'string',
  })
  password: string;

  @Column({ type: 'bigint', default: 1234567890 })
  @ApiProperty({
    description: 'User phone',
    example: 1234567890,
    type: 'integer',
  })
  phone: number;

  @Column({ type: 'varchar', default: Role.User })
  @ApiProperty({
    description: 'User role',
    example: Role.User,
    enum: Role,
  })
  role: Role;

  @Column({ type: 'varchar', default: UserStatus.Active })
  @ApiProperty({
    description: 'User status',
    example: UserStatus.Active,
    enum: UserStatus,
  })
  status: UserStatus;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  @ApiProperty({
    description: 'User image',
    example: 'urlimage',
    type: 'string',
  })
  image: string;
}
