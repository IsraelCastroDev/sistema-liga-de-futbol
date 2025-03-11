import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { News } from './entities/news.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News) private readonly newsRepository: Repository<News>,
  ) {}

  async create(createNewsDto: CreateNewsDto) {
    const newPost = this.newsRepository.create(createNewsDto);
    await this.newsRepository.save(newPost);

    return { message: 'Noticia creada correctamente', statusCode: 201 };
  }

  async findAll() {
    const [news, count] = await this.newsRepository.findAndCount();
    return { news, count };
  }

  async findOne(id: number) {
    const newPost = await this.newsRepository.findOne({ where: { id } });
    if (!newPost) {
      throw new NotFoundException('Noticia no encontrada');
    }

    return newPost;
  }

  async update(id: number, updateNewsDto: UpdateNewsDto) {
    const newPost = await this.findOne(id);
    Object.assign(newPost, updateNewsDto);

    return { message: 'Noticia actualizada correctamente', statusCode: 200 };
  }

  async remove(id: number) {
    const newPost = await this.findOne(id);
    await this.newsRepository.remove(newPost);
    return { message: 'Noticia eliminada correctamente', statusCode: 200 };
  }
}
