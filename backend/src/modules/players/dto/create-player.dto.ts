import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsString,
  IsDateString,
  Matches,
} from 'class-validator';
import { DominantFoot } from '../enums/dominantFoot.enum';
import { PlayerPosition } from '../enums/playerPositions.enum';

export class CreatePlayerDto {
  @IsNotEmpty({ message: 'El nombre del futbolista es obligatorio' })
  @IsString({ message: 'El nombre del futbolista es inválido' })
  name: string;

  @IsNotEmpty({ message: 'El DNI del futbolista es obligatorio' })
  @Matches(/^\d{8}$/, {
    message: 'El DNI debe tener exactamente 8 dígitos numéricos',
  })
  dni: string;

  @IsNotEmpty({ message: 'El nombre del país es obligatorio' })
  @IsString({ message: 'El nombre del país es inválido' })
  country: string;

  @IsNotEmpty({
    message: 'La fecha de nacimiento del futbolista es obligatoria',
  })
  @IsDateString({}, { message: 'Fecha de nacimiento inválida' })
  birthdate: string;

  @IsNotEmpty({ message: 'La posición del futbolista es obligatoria' })
  @IsEnum(PlayerPosition, { message: 'La posición seleccionada no es válida' })
  position: PlayerPosition;

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

  @IsInt({ message: 'Id de equipo (teamId) inválido' })
  teamId: number;
}
