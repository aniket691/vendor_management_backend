import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  private readonly SALT_ROUNDS = 10;

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    try {
      const existingUser = await this.usersService.findByUsername(createUserDto.username);
      if (existingUser) {
        throw new ConflictException('Username already exists');
      }

      const hashedPassword = await bcrypt.hash(createUserDto.password, this.SALT_ROUNDS);
      const userToCreate = {
        ...createUserDto,
        password: hashedPassword,
      };

      const user = await this.usersService.create(userToCreate);
      const token = await this.generateToken(user);
      
      return {
        message: 'User registered successfully',
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
        },
        access_token: token,
      };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new Error('Error registering user: ' + error.message);
    }
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const { password: _, ...result } = user;
    return result;
  }

  async login(user: Partial<User>) {
    try {
      const token = await this.generateToken(user);
      return {
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
        },
        access_token: token,
      };
    } catch (error) {
      throw new UnauthorizedException('Login failed');
    }
  }

  private async generateToken(user: Partial<User>) {
    const payload = { 
      sub: user.id, 
      username: user.username,
      role: user.role,
    };
    return this.jwtService.sign(payload);
  }
}
