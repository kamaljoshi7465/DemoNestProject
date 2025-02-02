import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    return this.prisma.user.findMany();
  }

  async createUser(name: string, email: string, password: string) {
    try {
      return await this.prisma.user.create({
        data: { name, email, password },
      });
    } catch (error) {
      if (error.code === 'P2002' && error.meta?.target.includes('email')) {
        throw new ConflictException('Email already exists');
      }
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }
}