import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { User } from './user.entity';
import { MediaType } from '../../media-types/entities/media-type.entity';

@Entity()
export class Company {
  @PrimaryColumn('uuid')
  user_id: string;

  @Column({ length: 255, nullable: true })
  website: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ length: 255, nullable: true })
  logo: string;

  @Column({ type: 'enum', enum: ['small', 'medium', 'large'], nullable: true })
  company_size: 'small' | 'medium' | 'large';

  @Column({ nullable: true })
  established_year: number;

  @OneToOne(() => User, user => user.company)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToMany(() => MediaType, mediaType => mediaType.companies)
  @JoinTable({
    name: 'company_required_services',
    joinColumn: { name: 'company_id' },
    inverseJoinColumn: { name: 'media_type_id' }
  })
  required_services: MediaType[];
}