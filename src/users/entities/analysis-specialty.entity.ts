import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Individual } from './individual.entity';

@Entity()
export class AnalysisSpecialty {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  name: string;

  @ManyToMany(() => Individual, individual => individual.analysis_specialties)
  individuals: Individual[];
}