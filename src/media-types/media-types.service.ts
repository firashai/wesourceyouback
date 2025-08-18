import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MediaType } from './entities/media-type.entity';

@Injectable()
export class MediaTypesService {
  constructor(
    @InjectRepository(MediaType)
    private mediaTypeRepository: Repository<MediaType>,
  ) {}

  async findAll() {
    return this.mediaTypeRepository.find();
  }

  async findOne(id: number) {
    const mediaType = await this.mediaTypeRepository.findOne({ where: { id } });
    if (!mediaType) {
      throw new NotFoundException('Media type not found');
    }
    return mediaType;
  }

  async create(name: string, description?: string) {
    const mediaType = this.mediaTypeRepository.create({ name, description });
    return this.mediaTypeRepository.save(mediaType);
  }

  async update(id: number, name: string, description?: string) {
    const mediaType = await this.findOne(id);
    mediaType.name = name;
    mediaType.description = description;
    return this.mediaTypeRepository.save(mediaType);
  }

  async remove(id: number) {
    const mediaType = await this.findOne(id);
    await this.mediaTypeRepository.remove(mediaType);
    return { message: 'Media type deleted successfully' };
  }
}