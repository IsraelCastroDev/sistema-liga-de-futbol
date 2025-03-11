import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team) private readonly teamsRepository: Repository<Team>,
  ) {}

  async create(createTeamDto: CreateTeamDto) {
    const { name } = createTeamDto;
    const team = await this.teamsRepository.exists({ where: { name } });
    if (team) {
      throw new ConflictException('Ya existe un club con este nombre');
    }

    await this.teamsRepository.save(createTeamDto);

    return { message: 'Club creado correctamente', statusCode: 201 };
  }

  async findAll() {
    const [teams, count] = await this.teamsRepository.findAndCount();
    return { teams, count };
  }

  async findOne(id: number) {
    const team = await this.teamsRepository.findOne({ where: { id } });
    if (!team) {
      throw new NotFoundException('Club no encontrado');
    }

    return team;
  }

  async update(id: number, updateTeamDto: UpdateTeamDto) {
    const team = await this.findOne(id);
    Object.assign(team, updateTeamDto);
    return { message: 'Club actualizado correctamente', statusCode: 200 };
  }

  async remove(id: number) {
    const team = await this.findOne(id);
    await this.teamsRepository.remove(team);
    return { message: 'Club eliminado correctamente', statusCode: 200 };
  }
}
