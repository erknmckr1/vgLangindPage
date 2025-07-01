import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { LoginLog } from '../entities/login-log-entity';
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Erkan3402.',
  database: 'log_service_db',
  entities: [LoginLog],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
