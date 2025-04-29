import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Playtime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string; // 'YYYY-MM-DD'

  @Column({ type: 'bigint' })
  totalMs: number;

  @UpdateDateColumn()
  updatedAt: Date;
}
