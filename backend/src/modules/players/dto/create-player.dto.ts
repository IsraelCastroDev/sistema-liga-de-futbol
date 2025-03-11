import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { DominantFoot } from '../enums/dominantFoot.enum';

export class CreatePlayerDto {
  @IsNotEmpty({ message: 'El nombre del futbolista es obligatorio' })
  name: string;

  @IsNotEmpty({ message: 'El nombre del país es obligatorio' })
  country: string;

  @IsNotEmpty({
    message: 'La fecha de nacimiento del futbolista es obligatoria',
  })
  birthdate: string;

  @IsNotEmpty({ message: 'La posición del futbolista es obligatoria' })
  position: string;

  @IsEnum(DominantFoot, { message: 'Pie dominante inválido' })
  dominantFoot: DominantFoot;

  @IsNumber({}, { message: 'Altura inválida, debe ser un número' })
  height: number;

  @IsNumber({}, { message: 'Peso inválido, debe ser un número' })
  weight: number;

  @IsOptional()
  @IsInt({ message: 'Número de goles inválido, debe ser un entero' })
  goals?: number;

  @IsOptional()
  @IsInt({ message: 'Número de asistencias inválido, debe ser un entero' })
  assists?: number;
}
