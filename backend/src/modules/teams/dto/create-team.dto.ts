import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTeamDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'Nombre inválido' })
  name: string;

  @IsNotEmpty({ message: 'El nombre del entrenador es obligatorio' })
  @IsString({ message: 'Nombre de entrenador inválido' })
  coach: string;

  @IsNotEmpty({ message: 'El nombre del propietario obligatorio' })
  @IsString({ message: 'Nombre de propietario inválido' })
  owner: string;

  @IsNotEmpty({ message: 'El año de fundación es obligatorio' })
  @IsInt({ message: 'Año de fundación inválido' })
  foundedYear: number;

  @IsOptional()
  @IsString({ message: 'Nombre de estadio inválido' })
  stadium?: string;
}
