import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entities';

@Entity('themes')
export class Theme {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  previewImage: string;

  @OneToOne(() => User, (user) => user.theme)
  @JoinColumn()
  user: User;
}
