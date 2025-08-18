import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { User } from './user.entity';
import { MediaType } from '../../media-types/entities/media-type.entity';
import { AnalysisSpecialty } from './analysis-specialty.entity';

@Entity()
export class Individual {
  @PrimaryColumn('uuid')
  user_id: string;

  @Column({ type: 'date' })
  birth_date: Date;

  @Column({ type: 'date' })
  media_start_date: Date;

  @Column({ default: false })
  has_camera: boolean;

  @Column({ length: 100, nullable: true })
  camera_type: string;

  @Column({ default: false })
  has_audio_equipment: boolean;

  @Column({ length: 100, nullable: true })
  audio_equipment_type: string;

  @Column({ default: false })
  can_travel: boolean;

  @Column({ type: 'decimal', precision: 3, scale: 1, default: 0.0 })
  rating: number;

  @Column({ default: 0 })
  completed_projects: number;

  @OneToOne(() => User, user => user.individual)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToMany(() => MediaType, mediaType => mediaType.individuals)
  @JoinTable({
    name: 'individual_media_types',
    joinColumn: { name: 'individual_id' },
    inverseJoinColumn: { name: 'media_type_id' }
  })
  media_types: MediaType[];

  @ManyToMany(() => AnalysisSpecialty, specialty => specialty.individuals)
  @JoinTable({
    name: 'individual_analysis_specialties',
    joinColumn: { name: 'individual_id' },
    inverseJoinColumn: { name: 'specialty_id' }
  })
  analysis_specialties: AnalysisSpecialty[];
}