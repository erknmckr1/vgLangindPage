import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../users/entities/user.entities';
import { BillingInfo } from '../users/entities/billing-info.entity';
import { StoreProfile } from '../users/entities/store-profile.entities';
import { ProductType } from '../users/entities/product-type.entity';
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Erkan3402.',
  database: 'auth_db',
  entities: [User, BillingInfo, StoreProfile, ProductType],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
