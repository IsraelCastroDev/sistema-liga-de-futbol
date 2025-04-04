import { Player } from '../../players/entities/player.entity';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('teams')
@Index(['name'], { unique: true })
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'varchar', length: 60 })
  coach: string;

  @Column({ type: 'varchar', length: 60 })
  owner: string;

  @Column({ type: 'int' })
  foundedYear: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  stadium?: string;

  @OneToMany(() => Player, (player) => player.team)
  players: Player[];
}
