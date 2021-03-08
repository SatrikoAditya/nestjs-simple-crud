import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from "@nestjs/common";
import { CreateTodoDto } from "./create-todo.dto";
import { TodoService } from "./todo.service";

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService){}

  @Get()
  async findAll() {
    return {
      data: await this.todoService.findAll()
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return {
      data: await this.todoService.findOne(id)
    }
  }

  @Post()
  async create(@Body() data: CreateTodoDto) {
    return {
      message: 'Success Add new Todo',
      data: await this.todoService.create(data)
    }
  }

  @Patch('update/:id')
  async update(@Param('id') id: number, @Body() data: CreateTodoDto) {
    return {
      data: await this.todoService.update(id, data)
    }
  }

  @Delete('delete/:id')
  async delete(@Param('id') id:number) {
    await this.todoService.delete(id)
    return {
      message: `Success Delete todo with id ${id}`
    }
  }

}