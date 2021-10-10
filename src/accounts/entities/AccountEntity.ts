import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IAccount } from '../interfaces/IAccount';
import { TRole } from '../types/TRole';

@Entity('accounts')
export class AccountEntity implements IAccount{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  firstName: string;

  @Column({nullable: true})
  lastName: string;

  @Column({
    unique: true
  })
  email: string;

  @Column({nullable: true})
  phone: string;

  @Column({
    type: 'enum',
    enum: TRole,
    default: TRole.customer,
  })
  role: TRole;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

}
