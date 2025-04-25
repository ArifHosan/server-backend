import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  link: string;

  @Column()
  playtimeMs: number;

  @Column({ default: '' })
  slug: string;

  @Column({ default: '' })
  platform: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
