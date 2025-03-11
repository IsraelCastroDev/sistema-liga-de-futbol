import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DominantFoot } from '../enums/dominantFoot.enum';
import { PlayerPosition } from '../enums/playerPositions.enum';
import { Team } from '../../teams/entities/team.entity';

@Entity('players')
@Index(['dni'], { unique: true })
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 60 })
  name: string;

  @Column({ type: 'varchar', length: 8 })
  dni: string;

  @Column({ type: 'varchar' })
  country: string;

  @Column({ type: 'date' })
  birthdate: string;

  @Column({ type: 'enum', enum: PlayerPosition })
  position: PlayerPosition;

  @Column({ type: 'enum', enum: DominantFoot })
  dominantFoot: DominantFoot;

  @Column({ type: 'decimal' })
  height: number;

  @Column({ type: 'decimal' })
  weight: number;

  @Column({ type: 'int', nullable: true })
  goals?: number;

  @Column({ type: 'int', nullable: true })
  assists?: number;

  @ManyToOne(() => Team, (team) => team.players, { onDelete: 'CASCADE' })
  team: Team;

  @Column({ type: 'int' })
  teamId: number;
}
