// src/auth/dto/login.dto.ts
import { IsEmail, IsNotEmpty, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: 'Email' })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'Senha' })
  password: string;

  // @IsArray()
  // tasks: Array<any>
}
