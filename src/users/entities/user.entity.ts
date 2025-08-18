import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn, OneToMany, BeforeInsert } from 'typeorm';
import { Individual } from './individual.entity';
import { Company } from './company.entity';
import { SocialMedia } from './social-media.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class User {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 20 })
  phone: string;

  @Column({ length: 255 })
  password_hash: string;

  @Column({ length: 50 })
  country: string;

  @Column({ length: 50 })
  city: string;

  @Column({ type: 'enum', enum: ['individual', 'company'] })
  type: 'individual' | 'company';

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  last_login: Date;

  @Column({ type: 'enum', enum: ['active', 'suspended', 'pending'], default: 'pending' })
  status: 'active' | 'suspended' | 'pending';

  @Column({ length: 255, nullable: true })
  profile_picture: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @OneToOne(() => Individual, individual => individual.user, { cascade: true })
  individual: Individual;

  @OneToOne(() => Company, company => company.user, { cascade: true })
  company: Company;

  @OneToMany(() => SocialMedia, socialMedia => socialMedia.user)
  social_media: SocialMedia[];

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}