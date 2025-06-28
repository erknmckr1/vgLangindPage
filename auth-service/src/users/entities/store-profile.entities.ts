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

  @Column()
  storeName: string;

  @Column({ nullable: true })
  slogan: string;

  @Column({ nullable: true })
  category: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  logo: string;

  @Column({ nullable: true })
  theme: string;

  // () => StoreProfile: Bu, ilişki kurulacak hedef entity’yi belirtir.
  // (profile) => profile.user profile parametresi, StoreProfile entity’sinden gelen örnek nesnedir.
  // profile.user, StoreProfile içinde tanımladığımız şu alanı referans alır:
  //   @OneToOne(() => User, (user) => user.storeProfile)
  // @JoinColumn()
  // user: User;

  @OneToOne(() => User, (user) => user.storeProfile)
  @JoinColumn()
  user: User;
}
