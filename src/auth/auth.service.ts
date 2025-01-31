import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class AuthService {
  private readonly users: User[] = [];

  async login(loginDto: LoginDto) {
    const user = this.users.find(user => user.username === loginDto.username && user.password === loginDto.password);
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return { message: 'Login successful' };
  }

  async signup(signupDto: SignupDto) {
    const userExists = this.users.some(user => user.username === signupDto.username);
    if (userExists) {
      throw new HttpException('User already exists', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    this.users.push(signupDto);
    return { message: 'Signup successful' };
  }
}