import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Company } from '../../users/entities/company.entity';
import { Individual } from '../../users/entities/individual.entity';

@Entity()
export class MediaType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToMany(() => Individual, individual => individual.media_types)
  individuals: Individual[];

  @ManyToMany(() => Company, company => company.required_services)
  companies: Company[];
}