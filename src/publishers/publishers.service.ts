import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Publisher } from './entities/publisher.entity';

@Injectable()
export class PublishersService {
  constructor(
    @InjectRepository(Publisher)
    private bookRepository: Repository<Publisher>,
  ) {}

  async getAll(): Promise<Publisher[]> {
    return await this.bookRepository.find();
  }

  async getOne(id: number): Promise<Publisher> {
    return await this.bookRepository.findOne(id);
  }

  async save(book: Publisher): Promise<Publisher> {
    return await this.bookRepository.save(book);
  }

  async delete(id: number): Promise<any> {
    return await this.bookRepository.delete(id);
  }
}
