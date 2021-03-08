import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from './todos/todo.controller';
import { Todo } from './todos/todo.entity';
import { TodoService } from './todos/todo.service';
import * as connectionOptions from './database/ormconfig'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot(connectionOptions),
    TypeOrmModule.forFeature([Todo])
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class AppModule {}
