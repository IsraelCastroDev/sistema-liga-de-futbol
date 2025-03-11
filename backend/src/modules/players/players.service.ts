import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Player } from './entities/player.entity';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
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

  async findAll() {
    const [players, count] = await this.playerRepository.findAndCount();
    return { players, count };
  }

  async findOne(id: number) {
    const player = await this.playerRepository.findOne({ where: { id } });
    if (!player) {
      throw new NotFoundException('Futbolista no encontrado');
    }

    return player;
  }

  async update(id: number, updatePlayerDto: UpdatePlayerDto) {
    const player = await this.findOne(id);
    Object.assign(player, updatePlayerDto);
    await this.playerRepository.save(player);

    return { message: 'Gutbolista actualizado correctamente', statusCode: 200 };
  }

  async remove(id: number) {
    const player = await this.findOne(id);
    await this.playerRepository.remove(player);
    return { message: 'Futbolista eliminado correctamente', statusCode: 200 };
  }
}
