import { Entity, PrimaryColumn, Column, ManyToOne, BeforeInsert } from 'typeorm';
import { Project } from './project.entity';
import { User } from '../../users/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { JoinColumn } from 'typeorm';

@Entity()
export class Rating {
  @PrimaryColumn('uuid')
  id: string;

  @ManyToOne(() => Project, project => project.ratings)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'rated_by' })
  rated_by: User;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'rated_user' })
  rated_user: User;

  @Column({ type: 'decimal', precision: 2, scale: 1 })
  rating: number;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}