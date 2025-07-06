// src/users/entities/store-profile.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entities';

@Entity('store_profiles')
export class StoreProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  slogan: string;

  @Column({ nullable: true })
  category: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  logo: string;

  @OneToOne(() => User, (user) => user.storeProfile)
  @JoinColumn()
  user: User;
}
