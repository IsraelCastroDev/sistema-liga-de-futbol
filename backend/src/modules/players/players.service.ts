import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { TypeORMError } from '../../common/types/error.type';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) {}

  async create(createPlayerDto: CreatePlayerDto) {
    try {
      await this.playerRepository.save(createPlayerDto);

      return {
        message: 'Futbolista registrado correctamente',
        statusCode: 201,
      };
    } catch (error: unknown) {
      if (error instanceof QueryFailedError) {
        const typeormError = error as TypeORMError;
        if (typeormError.driverError?.code === '23505') {
          throw new ConflictException('El futbolista ya está registrado');
        }
      }
      console.log(error);
      throw new InternalServerErrorException('Ocurrió un error inesperado');
    }
  }

  findAll() {
    return `This action returns all players`;
  }

  findOne(id: number) {
    return `This action returns a #${id} player`;
  }

  update(id: number, updatePlayerDto: UpdatePlayerDto) {
    return `This action updates a #${id} player`;
  }

  remove(id: number) {
    return `This action removes a #${id} player`;
  }
}
