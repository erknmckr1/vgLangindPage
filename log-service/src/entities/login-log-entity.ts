import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('login_logs')
export class LoginLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  ipAddress: string;

  @CreateDateColumn()
  loginAt: Date;

  @Column({ nullable: true })
  userAgent: string;

  @Column({ type: 'timestamp', nullable: true })
  logoutAt: Date;

  @Column({
    type: 'enum',
    enum: ['LOGIN', 'LOGOUT', 'EXPIRED'],
    default: 'LOGIN',
  })
  status: 'LOGIN' | 'LOGOUT' | 'EXPIRED';

  @Column({ nullable: true })
  sessionId?: string; // Aynı oturumu eşleştirmek için opsiyonel
}
