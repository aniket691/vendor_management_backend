import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity'; // Import entity

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Register Entity
  providers: [UsersService], // Register Service & Repository
  exports: [UsersService, TypeOrmModule], // Export Service & TypeOrmModule
  controllers: [UsersController],
})
export class UsersModule {}
