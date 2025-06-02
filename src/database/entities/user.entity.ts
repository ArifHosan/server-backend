import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Utilities } from './utilities.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Utilities, (utility) => utility.user)
  utilities: Utilities[];
}
