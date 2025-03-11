import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DominantFoot } from '../enums/dominantFoot.enum';
import { PlayerPosition } from '../enums/playerPositions.enum';

@Entity('players')
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 60 })
  name: string;

  @Column({ type: 'varchar' })
  country: string;

  @Column({ type: 'date' })
  birthdate: string;

  @Column({ type: 'enum', enum: PlayerPosition })
  position: PlayerPosition;

  @Column({ type: 'enum', enum: DominantFoot })
  dominanFoot: DominantFoot;

  @Column({ type: 'decimal' })
  height: number;

  @Column({ type: 'decimal' })
  weight: number;

  @Column({ type: 'int', nullable: true })
  goals?: number;

  @Column({ type: 'int', nullable: true })
  assits?: number;
}
