// src/auth/dto/login.dto.ts
import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: 'Email' })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'Senha' })
  password: string;
}
