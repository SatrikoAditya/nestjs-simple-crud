import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTodoDto } from "./create-todo.dto";
import { Todo } from "./todo.entity";

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private TodoRepository: Repository<Todo>
  ){}

  findAll() {
    return this.TodoRepository.find()
  }

  findOne(id: number) {
    return this.TodoRepository.findOneOrFail(id)
  }

  create(data: CreateTodoDto) {
    const todo = new Todo()
    todo.title = data.title
    todo.description = data.description
    todo.status = data.status

    return this.TodoRepository.save(todo)
  }

  delete(id: number) {
    return this.TodoRepository.delete(id)
  }

  update(id: number, data: CreateTodoDto) {
    return this.TodoRepository.save({...data, id: Number(id)})
  }

}