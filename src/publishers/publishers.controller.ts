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
import { PublishersService } from './publishers.service';
import { Publisher } from './entities/publisher.entity';

@Controller('publishers')
export class PublishersController {
  constructor(private readonly publishersService: PublishersService) {}

  logger: Logger = new Logger();

  @Get()
  @Render('publishers/index')
  async books(): Promise<any> {
    return {
      publishers: await this.publishersService.getAll(),
    };
  }

  @Get('one/:id')
  @Render('publishers/one')
  async book(@Param() id: number): Promise<any> {
    return {
      publisher: await this.publishersService.getOne(id),
    };
  }

  @Get('/add')
  @Render('publishers/add')
  async bookAdd(): Promise<any> {
    return {
      publishers: await this.publishersService.getAll(),
    };
  }

  @Post('/save')
  async saveBook(@Res() res, @Body() publisher: Publisher): Promise<any> {
    const savedBook = await this.publishersService.save(publisher);
    this.logger.log(publisher);
    return savedBook ? res.redirect('/publishers') : 'Ошибка сохранения';
  }

  @Post('/delete')
  async delete(@Res() res, @Body() id: number): Promise<any> {
    const savedBook = await this.publishersService.delete(id);
    return savedBook ? res.redirect('/publishers') : 'Ошибка сохранения';
  }
}
