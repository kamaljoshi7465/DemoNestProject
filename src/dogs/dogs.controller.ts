import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { DogsService } from "./dogs.service";
import { CreateDogDto } from "./dto/create-dog.dto";
import { Dog } from "./interfaces/dog.interface";
import { UpdateDogDto } from "./dto/update-dog.dto";

@Controller('dogs')
export class DogsController {
  constructor(private dogService: DogsService) { }
  @Get()
  async findAll() {
    return this.dogService.findAll();
  }

  @Post()
  async create(@Body() createDogDto: CreateDogDto) {
    const dog = this.dogService.create(createDogDto);
    return { dog: dog, message: 'Dog added successfully' };
  }

  @Get(':id')
  showDog(@Param('id') id: string): Dog | undefined {
    return this.dogService.showDog(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateDogDto: UpdateDogDto) {
    return this.dogService.updateDog(+id, updateDogDto);
  }

  @Delete(':id')
  destory(@Param('id') id: number) {
    const dog = this.dogService.destoryDog(+id);
    return { dog: dog, message: 'Dog deleted successfully' };
  }
}