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
  ParseIntPipe,
  ParseUUIDPipe,
  Query,
  DefaultValuePipe,
  ParseBoolPipe,
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
  findAll(
    @Query('activeOnly', new DefaultValuePipe(false), ParseBoolPipe)
    activeOnly: boolean,
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
  ) {
    return this.catsService.findAll({ activeOnly, page });
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
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.catsService.findOne(id);
  }

  @Get('/uuid/:uuid')
  async findOneUuid(
    @Param('uuid', ParseUUIDPipe)
    uuid: string,
  ) {
    return this.catsService.findOneUuid(uuid);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCatDto: UpdateCatDto,
  ) {
    return this.catsService.update(id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.catsService.remove(id);
  }
}
