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
      console.log('Starting registration for user:', createUserDto.username);
      const existingUser = await this.usersService.findByUsername(createUserDto.username);
      if (existingUser) {
        console.log('Username already exists:', createUserDto.username);
        throw new ConflictException('Username already exists');
      }

      const hashedPassword = await bcrypt.hash(createUserDto.password, this.SALT_ROUNDS);
      console.log('Password hashed successfully');
      
      const userToCreate = {
        ...createUserDto,
        password: hashedPassword,
      };

      const user = await this.usersService.create(userToCreate);
      console.log('User created successfully:', { id: user.id, username: user.username });
      
      const token = await this.generateToken(user);
      console.log('JWT token generated for new user');
      
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
      console.error('Error in registration:', error.message);
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new Error('Error registering user: ' + error.message);
    }
  }

  async validateUser(username: string, password: string): Promise<any> {
    console.log('Validating user credentials for:', username);
    const user = await this.usersService.findByUsername(username);
    
    if (!user) {
      console.log('User not found:', username);
      throw new UnauthorizedException('Invalid username or password');
    }

    console.log('User found, comparing passwords');
    console.log('Input password length:', password.length);
    console.log('Stored hash length:', user.password.length);
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Password validation result:', isPasswordValid);
    
    if (!isPasswordValid) {
      console.log('Password validation failed for user:', username);
      throw new UnauthorizedException('Invalid username or password');
    }

    console.log('User validated successfully:', { id: user.id, username: user.username });
    const { password: _, ...result } = user;
    return result;
  }

  async login(user: Partial<User>) {
    try {
      console.log('Generating login response for user:', user.username);
      const token = await this.generateToken(user);
      console.log('JWT token generated successfully');
      
      return {
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
        },
        access_token: token,
      };
    } catch (error) {
      console.error('Login error:', error.message);
      throw new UnauthorizedException('Login failed');
    }
  }

  private async generateToken(user: Partial<User>) {
    console.log('Generating JWT token for user:', user.username);
    const payload = { 
      sub: user.id, 
      username: user.username,
      role: user.role,
    };
    const token = this.jwtService.sign(payload);
    console.log('Token generated successfully');
    return token;
  }
}
