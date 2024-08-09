import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  Matches,
  Length,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class UpdateUserDto {
  /**
   * Nombre del usuario
   * @example 'CarlosGarcia'
   */
  @ApiProperty({
    description:
      'Nombre del usuario, debe ser un string con al menos 3 caracteres',
    example: 'CarlosGarcia',
    required: false,
  })
  @IsString()
  @Length(3, 50)
  @IsOptional()
  name: string;

  /**
   * Correo electrónico del usuario
   * @example 'CarlosGarcia@gmail.com'
   */
  @ApiProperty({
    description: 'Correo electrónico del usuario, debe ser un email válido',
    example: 'CarlosGarcia@gmail.com',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  /**
   * Contraseña del usuario
   * @example 'CarlosGarcia123!'
   */
  @ApiProperty({
    description:
      'Contraseña del usuario, debe contener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial',
    example: 'CarlosGarcia123!',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/,
    {
      message:
        'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*',
    },
  )
  @Length(8, 15)
  password?: string;

  /**
   * Confirmación de la contraseña
   * @example 'CarlosGarcia123!'
   */
  @ApiProperty({
    description:
      'Confirmación de la contraseña, debe coincidir con la contraseña',
    example: 'CarlosGarcia123!',
    required: false,
  })
  @IsString()
  @IsOptional()
  confirmPassword?: string;

  /**
   * Número de teléfono del usuario
   * @example 123456789
   */
  @ApiProperty({
    description: 'Número de teléfono del usuario',
    example: 123456789,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  phone?: number;
}
