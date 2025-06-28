import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { StoreProfile } from 'src/users/entities/store-profile.entities';
import { ProductType } from 'src/users/entities/product-type.entity';
import { BillingInfo } from 'src/users/entities/billing-info.entity';
@Entity('users') // tablo adı
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => StoreProfile, (profile) => profile.user)
  storeProfile: StoreProfile;

  @OneToMany(() => ProductType, (pt) => pt.user)
  productTypes: ProductType[];

  @OneToMany(() => BillingInfo, (billingInfo) => billingInfo.user, {
    cascade: true,
  })
  billingInfos: BillingInfo[];
}
