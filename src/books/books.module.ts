import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { AuthorsModule } from '../authors/authors.module';
import { PublishersModule } from '../publishers/publishers.module';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), AuthorsModule, PublishersModule],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
