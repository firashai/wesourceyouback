import { Entity, PrimaryColumn, Column, ManyToOne, ManyToMany, JoinTable, BeforeInsert } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Tag } from './tag.entity';
import { v4 as uuidv4 } from 'uuid';
import { JoinColumn } from 'typeorm';

@Entity()
export class MediaContent {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'enum', enum: ['photo', 'video', 'audio'] })
  type: 'photo' | 'video' | 'audio';

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'uploader_id' })
  uploader: User;

  @Column({ length: 100 })
  location: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ default: false })
  is_exclusive: boolean;

  @Column({ default: 0 })
  views: number;

  @Column({ default: 0 })
  downloads: number;

  @Column({ type: 'enum', enum: ['active', 'pending', 'rejected'], default: 'pending' })
  status: 'active' | 'pending' | 'rejected';

  @Column({ length: 255 })
  thumbnail_url: string;

  @Column({ length: 255 })
  content_url: string;

  @Column({ length: 255, nullable: true })
  watermarked_preview_url: string;

  @ManyToMany(() => Tag)
  @JoinTable({
    name: 'content_tags',
    joinColumn: { name: 'content_id' },
    inverseJoinColumn: { name: 'tag_id' }
  })
  tags: Tag[];

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}