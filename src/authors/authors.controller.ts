import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Render,
  Res,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { Author } from './entities/author.entity';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  logger: Logger = new Logger();

  @Get()
  @Render('authors/index')
  async authors(): Promise<any> {
    return {
      authors: await this.authorsService.getAll(),
    };
  }

  @Get('one/:id')
  @Render('authors/one')
  async author(@Param() id: number): Promise<any> {
    return {
      author: await this.authorsService.getOne(id),
    };
  }

  @Get('/add')
  @Render('authors/add')
  async authorAdd(): Promise<any> {
    return {
      authors: await this.authorsService.getAll(),
    };
  }

  @Post('/save')
  async save(@Res() res, @Body() author: Author): Promise<any> {
    const savedBook = await this.authorsService.save(author);
    this.logger.log(author);
    return savedBook ? res.redirect('/authors') : 'Ошибка сохранения';
  }

  @Post('/delete')
  async delete(@Res() res, @Body() id: number): Promise<any> {
    const savedBook = await this.authorsService.delete(id);
    return savedBook ? res.redirect('/authors') : 'Ошибка сохранения';
  }
}
