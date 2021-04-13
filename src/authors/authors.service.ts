import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private bookRepository: Repository<Author>,
  ) {}

  async getAll(): Promise<Author[]> {
    return await this.bookRepository.find();
  }

  async getOne(id: number): Promise<Author> {
    return await this.bookRepository.findOne(id, {
      relations: ['books'],
    });
  }

  async save(book: Author): Promise<Author> {
    return await this.bookRepository.save(book);
  }

  async delete(id: number): Promise<any> {
    return await this.bookRepository.delete(id);
  }
}
