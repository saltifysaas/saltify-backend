import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tenant } from '../tenant/tenant.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: true, unique: true })
  email?: string;

  @Column({ nullable: true, unique: true })
  phone?: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  password?: string;

  @Column({ default: false })
  emailVerified!: boolean;

  @Column({ default: false })
  phoneVerified!: boolean;

  @Column({ nullable: true })
  otpCode?: string;

  @Column({ nullable: true })
  otpExpiresAt?: Date;

  @Column({ nullable: true })
  mfaSecret?: string;

  @Column({ nullable: true })
  socialProvider?: string;

  @Column({ nullable: true })
  socialId?: string;

  @ManyToOne(() => Tenant, (tenant) => tenant.users)
  @JoinColumn({ name: 'tenantId' })
  tenant!: Tenant;

  @Column()
  tenantId!: string;

  @Column({ default: 'user' })
  role!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
