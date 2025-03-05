import { Controller, Post, Body, Get, Param, Delete, Patch, UseGuards, Query, BadRequestException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { User } from '../auth/user.decorator';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

interface User {
  id: number
}

ApiTags('Tasks')
@ApiBearerAuth()
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 201, description: 'Tarefa criada com sucesso.' })
  async create(@Body() createTaskDto: CreateTaskDto, @User() user: User) {
    return this.tasksService.create(createTaskDto, user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Tarefa recuperada com sucesso.' })
  async findAll(@User() user: User) {
    return this.tasksService.findAll(user.id);
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Busca concluída' })
  async findByStatus(@Query('completed') completed: string, @User() user: User) {
    return await this.tasksService.findByStatus(completed === 'true', user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Tarefa encontrado.' })
  async findOne(@Param('id') id: string, @User() user: User) {
    return this.tasksService.findById(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 201, description: 'Tarefa alterada com sucesso.' })
  async update(@Param('id') id: string, @Body() updateTaskDto: CreateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Tarefa removida com sucesso.' })
  async remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}