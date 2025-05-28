import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('utilities')
export class Utility {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: string;

  @Column()
  type: string;

  @Column('float')
  unit: number;
}
