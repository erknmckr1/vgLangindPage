import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Erkan3402.',
  database: 'user_service_db',
  entities: ['src/user/entities/*.ts'],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
