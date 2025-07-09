import 'reflect-metadata';
import { DataSource } from 'typeorm';
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Erkan3402.',
  database: 'auth_db',
  entities: [],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
