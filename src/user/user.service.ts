import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async getAllUsers() {
    return this.prisma.user.findMany();
  }

  async createUser(createUserDto: CreateUserDto) {
    try {
      return await this.prisma.user.create({
        data: { ...createUserDto },
      });
    } catch (error) {
      if (error.code === 'P2002' && error.meta?.target.includes('email')) {
        throw new ConflictException('Email already exists');
      }
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  async getUserById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: { ...updateUserDto },
      });
    } catch (error) {
      if (error.code === 'P2002' && error.meta?.target.includes('email')) {
        throw new ConflictException('Email already exists');
      }
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  async deleteUser(id: number) {
    const user = this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new InternalServerErrorException('User not found');
    }
    
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
