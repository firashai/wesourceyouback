import { Entity, PrimaryColumn, Column, ManyToOne, BeforeInsert } from 'typeorm';
import { Project } from './project.entity';
import { Individual } from '../../users/entities/individual.entity';
import { v4 as uuidv4 } from 'uuid';
import { JoinColumn } from 'typeorm';

@Entity()
export class Offer {
  @PrimaryColumn('uuid')
  id: string;

  @ManyToOne(() => Project, project => project.offers)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @ManyToOne(() => Individual, individual => individual.user_id)
  @JoinColumn({ name: 'professional_id' })
  professional: Individual;

  @Column({ type: 'text', nullable: true })
  message: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  proposed_budget: number;

  @Column({ nullable: true })
  proposed_timeline: number;

  @Column({ type: 'enum', enum: ['pending', 'accepted', 'rejected', 'withdrawn'], default: 'pending' })
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}