import 'reflect-metadata'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234567',
  database: 'apivendas',
  migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
  // migrationsDir: ['./src/shared/typeorm/migrations'],  
});