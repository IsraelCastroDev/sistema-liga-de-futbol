import { IsNotEmpty } from 'class-validator';

export class SignInDto {
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
  email: string;

  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  password: string;
}
