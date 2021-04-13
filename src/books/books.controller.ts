import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Query,
  Render,
  Res,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { PublishersService } from '../publishers/publishers.service';
import { AuthorsService } from '../authors/authors.service';
import { ExportToCsv } from 'export-to-csv';

@Controller('books')
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
    private readonly publishersService: PublishersService,
    private readonly authorsService: AuthorsService,
  ) {}

  logger: Logger = new Logger();

  @Get()
  @Render('books/index')
  async books(): Promise<any> {
    return {
      books: await this.booksService.getAll(),
    };
  }

  @Get('one/:id')
  @Render('books/one')
  async book(@Param() id: number): Promise<any> {
    return {
      book: await this.booksService.getOne(id),
    };
  }

  @Get('/add')
  @Render('books/add')
  async bookAdd(): Promise<any> {
    return {
      books: await this.booksService.getAll(),
      publishers: await this.publishersService.getAll(),
      authors: await this.authorsService.getAll(),
    };
  }

  @Get('/update/:id')
  @Render('books/update')
  async bookUpdate(@Param() id: number): Promise<any> {
    return {
      book: await this.booksService.getOne(id),
      publishers: await this.publishersService.getAll(),
      authors: await this.authorsService.getAll(),
    };
  }

  @Get('/search')
  @Render('search/index')
  async searchBook(@Query('query') query: string): Promise<any> {
    return {
      query: query,
      books: await this.booksService.search(query),
    };
  }

  @Get('/export/csv')
  async exportToCsv(): Promise<any> {
    const books = await this.booksService.getAll();

    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'My Awesome CSV',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    };

    const exporter = new ExportToCsv(options);
    return await exporter.generateCsv(books);
  }

  @Post('/save')
  async saveBook(@Res() res, @Body() book: Book): Promise<any> {
    const savedBook = await this.booksService.save(book);
    return savedBook ? res.redirect('/books') : 'Ошибка сохранения';
  }

  @Post('/updatebook/:id')
  async updateBook(
    @Param() id: number,
    @Res() res,
    @Body() book: Book,
  ): Promise<any> {
    const savedBook = await this.booksService.update(id, book);
    return savedBook ? res.redirect('/books') : 'Ошибка сохранения';
  }

  @Post('/delete')
  async delete(@Res() res, @Body() id: number): Promise<any> {
    const savedBook = await this.booksService.delete(id);
    return savedBook ? res.redirect('/books') : 'Ошибка сохранения';
  }
}
