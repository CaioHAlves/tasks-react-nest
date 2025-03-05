import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Título da tarefa' })
  title: string;

  @IsBoolean()
  @ApiProperty({ description: 'Status da tarefa', default: false })
  completed?: boolean;
}