import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatsService {
  private id = 0;
  private readonly cats: Cat[] = [];

  create(createCatDto: CreateCatDto) {
    this.cats.push({ ...createCatDto, id: this.id++ });
  }

  findAll({ activeOnly, page }: { activeOnly: boolean; page: number }): Cat[] {
    console.log(activeOnly, page);
    return this.cats;
  }

  findOne(id: number): Cat {
    const cat = this.cats.find((cat) => cat.id === id);
    return cat;
  }

  findOneUuid(id: string): Cat {
    const cat = this.cats.find((cat) => cat.id === Number(id));
    return cat;
  }

  update(id: number, updateCatDto: UpdateCatDto) {
    const index = this.cats.findIndex((cat) => cat.id === id);
    if (index > -1) {
      this.cats[index] = { ...this.cats[index], ...updateCatDto };
    }
  }

  remove(id: number) {
    const index = this.cats.findIndex((cat) => cat.id === id);
    if (index > -1) {
      this.cats.splice(index, 1);
    }
  }
}
