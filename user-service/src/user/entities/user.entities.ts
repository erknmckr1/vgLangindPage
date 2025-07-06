import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { StoreProfile } from './store-profile.entities';
import { ProductType } from './product-type.entity';
import { BillingInfo } from './billing-info.entity';
import { Theme } from './theme.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  storeName: string;

  @Column({ unique: true })
  phone: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column('text', { nullable: true })
  refreshToken: string | null;

  @Column({ default: false })
  isOnboardingCompleted: boolean;

  @Column({ default: 1 })
  onboardingStep: number;

  @Column({ default: 'pending' })
  onboardingStatus: 'pending' | 'in_progress' | 'completed';

  @Column({ nullable: true })
  accountType: 'individual' | 'corporate'; // Step 1

  @Column({ nullable: true })
  profileType: 'product' | 'service'; // Step 2

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => StoreProfile, (profile) => profile.user, { nullable: true })
  storeProfile: StoreProfile;

  @OneToMany(() => ProductType, (pt) => pt.user)
  productTypes: ProductType[];

  @OneToOne(() => Theme, (theme) => theme.user, { nullable: true })
  theme: Theme;

  @OneToMany(() => BillingInfo, (billingInfo) => billingInfo.user, {
    cascade: true,
  })
  billingInfos: BillingInfo[];
}
