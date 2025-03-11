import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { hashPassword } from '../auth/common/auth';

type TypeORMError = {
  driverError: {
    code: string;
  };
} & Error;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const hashedPassword = await hashPassword(createUserDto.password);

      await this.userRepository.save({
        ...createUserDto,
        password: hashedPassword,
      });

      return { message: 'Usuario creado correctamente', statusCode: 201 };
    } catch (error: unknown) {
      if (error instanceof QueryFailedError) {
        const typeormError = error as TypeORMError;
        if (typeormError.driverError?.code === '23505') {
          throw new ConflictException('El usuario ya está registrado');
        }
      }
      throw new InternalServerErrorException('Ocurrió un error inesperado');
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return user;
  }

  async findUserAuth(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Usuario no autorizado');
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
