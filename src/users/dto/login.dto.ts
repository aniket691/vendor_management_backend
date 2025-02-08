import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ 
    example: 'admin', 
    description: 'Username of the user',
    required: true 
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ 
    example: 'securepassword', 
    description: 'User password',
    required: true 
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
