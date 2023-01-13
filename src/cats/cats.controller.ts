import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Get()
  findAll() {
    return this.catsService.findAll();
  }

  @Get('error')
  async error() {
    try {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    } catch (error) {
      throw new HttpException(
        'This is a custom message!!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(+id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catsService.remove(+id);
  }
}
