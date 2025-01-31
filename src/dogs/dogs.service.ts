import { Injectable, NotFoundException } from '@nestjs/common';
import { Dog } from './interfaces/dog.interface';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';

@Injectable()
export class DogsService {
  private readonly dogs: Dog[] = [];
  findAll(): Dog[] {
    return this.dogs;
  }

  create(createDogDto: CreateDogDto) {
    const newDog: Dog = { ...createDogDto, id: this.dogs.length + 1 };
    this.dogs.push(newDog);
    return newDog;
  }

  showDog(id: number) {
    const dog = this.dogs.find(dog => dog.id === id);
    if (!dog) {
      throw new NotFoundException(`Dog with id ${id} not found`);
    }
    return dog;
  }

  updateDog(id: number, updateDogDto: UpdateDogDto) {
    const dog = this.dogs.find(dog => dog.id === id);
    if (!dog) {
      throw new NotFoundException(`Dog with id ${id} not found`);
    }
    const updatedDog = { ...dog, ...updateDogDto };
    this.dogs[id - 1] = updatedDog;
    return updatedDog;
  }

  destoryDog(id: number) {
    const dog = this.dogs.find(dog => dog.id === id);
    if (!dog) {
      throw new NotFoundException(`Dog with id ${id} not found`);
    }
    this.dogs.splice(id - 1, 1);
    return dog;
  }
} 