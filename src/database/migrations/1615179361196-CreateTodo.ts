import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTodo1615179361196 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: 'todo',
            columns: [
                {name: 'id', type: 'serial', isPrimary: true, isGenerated: true},
                {name: 'title', type: 'varchar'},
                {name: 'description', type: 'text'},
                {name: 'status', type: 'boolean', default: true}
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('todo', true)
    }

}
