import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateNewsDto {
  @IsNotEmpty({ message: 'El título es obligatorio' })
  @IsString({ message: 'Título inválido' })
  title: string;

  @IsNotEmpty({ message: 'El contenido es obligatorio' })
  @IsString({ message: 'Contenido inválido' })
  content: string;

  @IsNotEmpty({ message: 'El url de la portada es obligatoria' })
  @IsString({ message: 'Url inválido' })
  coverImage: string;

  @IsNotEmpty({ message: 'EL usuario es obligatorio' })
  @IsInt({ message: 'Id de usuario inálido' })
  userId: number;
}
