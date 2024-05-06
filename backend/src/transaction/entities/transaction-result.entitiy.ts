import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Operation } from '../../shared/enums/operation.enum';

@Entity()
export class TransactionResult {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  total: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
