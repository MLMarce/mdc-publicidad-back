import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class LoginUserDto {
  /**
   * Correo electrónico del usuario
   * @example 'CarlosGarcia@gmail.com'
   */
  @ApiProperty({
    description: 'Correo electrónico del usuario, debe ser un email válido',
    example: 'CarlosGarcia@gmail.com',
  })
  @IsOptional()
  @IsEmail()
  email: string;

  /**
   * Contraseña del usuario
   * @example 'CarlosGarcia123!'
   */
  @ApiProperty({
    description:
      'Contraseña del usuario, debe contener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial',
    example: 'CarlosGarcia123!',
  })
  @IsOptional()
  @IsString()
  password: string;
}
