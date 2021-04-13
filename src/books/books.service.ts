import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Like, Repository, UpdateResult } from "typeorm";

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async getAll(): Promise<Book[]> {
    return await this.bookRepository.find();
  }

  async getOne(id: number): Promise<Book> {
    return await this.bookRepository.findOne(id);
  }

  async search(query: string): Promise<Book[]> {
    return await this.bookRepository.find({
      relations: ['author'],
      where: [
        {
          title: Like(`%${query.toLowerCase()}%`),
        },
        {
          genre: Like(`%${query.toLowerCase()}%`),
        },
      ],
    });
  }

  async save(book: Book): Promise<Book> {
    book.title = book.title.toLowerCase();
    book.description = book.description.toLowerCase();
    book.genre = book.genre.toLowerCase();
    return await this.bookRepository.save(book);
  }

  async update(id: number, book: Book): Promise<UpdateResult> {
    book.title = book.title.toLowerCase();
    book.description = book.description.toLowerCase();
    book.genre = book.genre.toLowerCase();
    return await this.bookRepository.update(id, book);
  }

  async delete(id: number): Promise<any> {
    return await this.bookRepository.delete(id);
  }
}
