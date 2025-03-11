import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Role } from '../enums/role.enum';

export class CreateUserDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre no es válido' })
  name: string;

  @IsNotEmpty({ message: 'Los apellidos es obligatorio' })
  @IsString({ message: 'Los apellidos no es válido' })
  surnames: string;

  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  email: string;

  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @IsString({ message: 'La contraseña es inválida' })
  password: string;

  @IsOptional()
  @IsEnum(Role, {
    message: `El rol debe ser uno de: ${Object.values(Role).join(', ')}`,
  })
  role?: Role;
}
