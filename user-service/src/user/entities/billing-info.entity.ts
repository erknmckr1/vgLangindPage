// src/users/entities/billing-info.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entities';

@Entity('billing_infos')
export class BillingInfo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  iban: string;

  @Column({ nullable: true })
  bankName: string;

  @Column({ nullable: true })
  taxId: string;

  @Column({ nullable: true })
  invoiceTitle: string;

  @Column({ default: false })
  isPrimary: boolean; // Ödeme alacağı varsayılan hesap

  @ManyToOne(() => User, (user) => user.billingInfos)
  user: User;
}
