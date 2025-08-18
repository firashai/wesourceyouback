import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { MediaContent } from './entities/content.entity';
import { Tag } from './entities/tag.entity';
import { User } from '../users/entities/user.entity';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(MediaContent)
    private contentRepository: Repository<MediaContent>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  async create(createContentDto: CreateContentDto, user: User) {
    const content = this.contentRepository.create({
      ...createContentDto,
      uploader: user,
    });

    if (createContentDto.tag_ids && createContentDto.tag_ids.length > 0) {
      const tags = await this.tagRepository.findBy({ id: In(createContentDto.tag_ids) });
      content.tags = tags;
    }

    return this.contentRepository.save(content);
  }

  async findAll() {
    return this.contentRepository.find({
      relations: ['uploader', 'tags'],
    });
  }

  async findOne(id: string) {
    const content = await this.contentRepository.findOne({
      where: { id },
      relations: ['uploader', 'tags'],
    });
    if (!content) {
      throw new NotFoundException('Content not found');
    }
    return content;
  }

  async update(id: string, updateContentDto: UpdateContentDto, user: User) {
    const content = await this.findOne(id);
    if (content.uploader.id !== user.id) {
      throw new ForbiddenException('You can only update your own content');
    }

    Object.assign(content, updateContentDto);

    if (updateContentDto.tag_ids) {
      const tags = await this.tagRepository.findBy({ id: In(updateContentDto.tag_ids) });
      content.tags = tags;
    }

    return this.contentRepository.save(content);
  }

  async remove(id: string, user: User) {
    const content = await this.findOne(id);
    if (content.uploader.id !== user.id) {
      throw new ForbiddenException('You can only delete your own content');
    }

    await this.contentRepository.remove(content);
    return { message: 'Content deleted successfully' };
  }

  async incrementViews(id: string) {
    const content = await this.findOne(id);
    content.views += 1;
    return this.contentRepository.save(content);
  }

  async incrementDownloads(id: string) {
    const content = await this.findOne(id);
    content.downloads += 1;
    return this.contentRepository.save(content);
  }

  async findAllTags() {
    return this.tagRepository.find();
  }

  async createTag(name: string) {
    const tag = this.tagRepository.create({ name });
    return this.tagRepository.save(tag);
  }

  async removeTag(id: number) {
    const tag = await this.tagRepository.findOne({ where: { id } });
    if (!tag) {
      throw new NotFoundException('Tag not found');
    }
    await this.tagRepository.remove(tag);
    return { message: 'Tag deleted successfully' };
  }
}