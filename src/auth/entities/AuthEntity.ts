import {IAuth} from "../interfaces/IAuth";
import {
  Column,
  CreateDateColumn,
  Entity, JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AccountEntity } from '../../accounts/entities/AccountEntity';

@Entity('auth')
export class AuthEntity implements IAuth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  publicKey: string;

  @Column()
  secretKey: string;

  @OneToOne(
    () => AccountEntity,
    account => account.id,
  )
  @JoinColumn()
  account: AccountEntity;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
