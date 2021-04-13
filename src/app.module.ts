import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorsModule } from './authors/authors.module';
import { BooksModule } from './books/books.module';
import { PublishersModule } from './publishers/publishers.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './db/books.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
    }),
    AuthorsModule,
    BooksModule,
    PublishersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
