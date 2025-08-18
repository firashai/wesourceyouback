import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class SocialMedia {
  @PrimaryColumn('uuid')
  user_id: string;

  @PrimaryColumn({ type: 'enum', enum: ['facebook', 'twitter', 'youtube', 'instagram', 'linkedin', 'other'] })
  platform: 'facebook' | 'twitter' | 'youtube' | 'instagram' | 'linkedin' | 'other';

  @Column({ length: 255 })
  url: string;

  @ManyToOne(() => User, user => user.social_media)
  @JoinColumn({ name: 'user_id' })
  user: User;
}