import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable, BeforeInsert } from 'typeorm';
import { Company } from '../../users/entities/company.entity';
import { Individual } from '../../users/entities/individual.entity';
import { MediaType } from '../../media-types/entities/media-type.entity';
import { Offer } from './offer.entity';
import { Rating } from './rating.entity';
import { v4 as uuidv4 } from 'uuid';
import { JoinColumn } from 'typeorm';

@Entity()
export class Project {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => Company, company => company.user_id)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @ManyToOne(() => Individual, individual => individual.user_id, { nullable: true })
  @JoinColumn({ name: 'professional_id' })
  professional: Individual;

  @Column({ type: 'enum', enum: ['pending', 'active', 'completed', 'cancelled'], default: 'pending' })
  status: 'pending' | 'active' | 'completed' | 'cancelled';

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ type: 'date', nullable: true })
  start_date: Date;

  @Column({ type: 'date', nullable: true })
  end_date: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  budget: number;

  @Column({ length: 100, nullable: true })
  location: string;

  @OneToMany(() => Offer, offer => offer.project)
  offers: Offer[];

  @OneToMany(() => Rating, rating => rating.project)
  ratings: Rating[];

  @ManyToMany(() => MediaType)
  @JoinTable({
    name: 'project_required_services',  // Changed this
    joinColumn: { name: 'project_id' },  // Also changed join column
    inverseJoinColumn: { name: 'media_type_id' }
  })
  required_services: MediaType[];

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}