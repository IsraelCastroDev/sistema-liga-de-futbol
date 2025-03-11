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

  async findAll() {
    const [users, count] = await this.userRepository.findAndCount();
    return { users, count };
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

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    Object.assign(user, updateUserDto);
    await this.userRepository.save(user);

    return { message: 'Usuario actualizado correctamente', statusCode: 200 };
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);

    return { message: 'Usuario eliminado correctamente', statusCode: 200 };
  }
}
