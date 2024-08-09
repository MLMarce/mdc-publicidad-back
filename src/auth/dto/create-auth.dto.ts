import { PickType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  Matches,
  Length,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  /**
   * Debe ser un string con al menos 3 caracteres
   * @example 'CarlosGarcia'
   */
  @ApiProperty({
    description:
      'Nombre del usuario, debe ser un string con al menos 3 caracteres',
    example: 'CarlosGarcia',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  name: string;

  /**
   * Debe ser un email válido y no puede estar vacío
   * @example 'CarlosGarcia@gmail.com'
   */
  @ApiProperty({
    description: 'Correo electrónico del usuario, debe ser un email válido',
    example: 'CarlosGarcia@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * Debe ser un string con al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales
   * @example 'CarlosGarcia123!'
   */
  @ApiProperty({
    description:
      'Contraseña del usuario, debe contener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial',
    example: 'CarlosGarcia123!',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/,
    {
      message:
        'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*',
    },
  )
  @Length(8, 15)
  password: string;

  /**
   * Debe ser un string que coincida con la contraseña
   * @example 'CarlosGarcia123!'
   */
  @ApiProperty({
    description:
      'Confirmación de la contraseña, debe coincidir con la contraseña',
    example: 'CarlosGarcia123!',
  })
  @IsNotEmpty()
  @IsString()
  confirmPassword: string;

  /**
   * Debe ser un número y no puede estar vacío
   * @example 123456789
   */
  @ApiProperty({
    description: 'Número de teléfono del usuario',
    example: 123456789,
  })
  @IsNotEmpty()
  @IsNumber()
  phone: number;
}
export class CreateUserAuthDto extends PickType(CreateUserDto, [
  'name',
  'email',
]) {
  @IsString()
  @IsOptional()
  image: string;
}
