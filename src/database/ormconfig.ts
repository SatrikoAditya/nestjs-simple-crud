import { join } from 'path'
import { Todo } from 'src/todos/todo.entity'
import { ConnectionOptions } from 'typeorm'
const PROD_ENV = 'production'

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT
}

// FOR GOOGLE CLOUD SQL
if (
  process.env.INSTANCE_CONNECTION_NAME &&
  process.env.NODE_ENV === PROD_ENV
) {
  config.host = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`
}

const connectionOptions: ConnectionOptions = {
  type: 'mysql',
  host: config.host,
  port: Number(config.port),
  username: config.user,
  password: config.password,
  database: config.database,
  entities: [
    Todo
  ],
  // We are using migrations, synchronize should be set to false.
  synchronize: false,
  dropSchema: false,
  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: true,
  logging: ['warn', 'error'],
  logger: process.env.NODE_ENV === PROD_ENV ? 'file' : 'debug',
  migrations: [
    join(__dirname, 'migrations/*{.ts,.js}')
  ],
  cli: {
    migrationsDir: 'src/database/migrations'
  }
}

export = connectionOptions
