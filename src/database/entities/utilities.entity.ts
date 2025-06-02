import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Utilities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: string;

  @Column()
  type: string;

  @Column('float')
  value: number; // the numeric reading

  @Column({ type: 'varchar', length: 20 })
  unit: string; // unit of measurement, e.g. "m³", "liters"

  @Column()
  meterNumber: string;

  @ManyToOne(() => User, (user) => user.utilities, { eager: true })
  user: User;
}
