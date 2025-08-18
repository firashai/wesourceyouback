import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { User } from './entities/user.entity';
import { Individual } from './entities/individual.entity';
import { Company } from './entities/company.entity';
import { SocialMedia } from './entities/social-media.entity';
import { MediaType } from '../media-types/entities/media-type.entity';
import { AnalysisSpecialty } from './entities/analysis-specialty.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Individual)
    private individualsRepository: Repository<Individual>,
    @InjectRepository(Company)
    private companiesRepository: Repository<Company>,
    @InjectRepository(SocialMedia)
    private socialMediaRepository: Repository<SocialMedia>,
    @InjectRepository(MediaType)
    private mediaTypeRepository: Repository<MediaType>,
    @InjectRepository(AnalysisSpecialty)
    private analysisSpecialtyRepository: Repository<AnalysisSpecialty>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.usersRepository.findOne({ where: { email: createUserDto.email } });
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.usersRepository.create({
      ...createUserDto,
      password_hash: hashedPassword,
    });

    const savedUser = await this.usersRepository.save(user);

    if (createUserDto.type === 'individual') {
      const individual = this.individualsRepository.create({
        user_id: savedUser.id,
        birth_date: new Date(),
        media_start_date: new Date(),
      });
      await this.individualsRepository.save(individual);
    } else if (createUserDto.type === 'company') {
      const company = this.companiesRepository.create({
        user_id: savedUser.id,
      });
      await this.companiesRepository.save(company);
    }

    return this.findOne(savedUser.id);
  }

  async findAll() {
    return this.usersRepository.find({
      relations: ['individual', 'company', 'social_media'],
    });
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['individual', 'company', 'social_media'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.type === 'individual' && user.individual) {
      // الحصول على media_types باستخدام query builder
      user.individual.media_types = await this.mediaTypeRepository
        .createQueryBuilder('mediaType')
        .innerJoin('mediaType.individuals', 'individual')
        .where('individual.user_id = :userId', { userId: user.id })
        .getMany();

      // الحصول على analysis_specialties باستخدام query builder
      user.individual.analysis_specialties = await this.analysisSpecialtyRepository
        .createQueryBuilder('specialty')
        .innerJoin('specialty.individuals', 'individual')
        .where('individual.user_id = :userId', { userId: user.id })
        .getMany();
    } else if (user.type === 'company' && user.company) {
      // الحصول على required_services باستخدام query builder
      user.company.required_services = await this.mediaTypeRepository
        .createQueryBuilder('mediaType')
        .innerJoin('mediaType.companies', 'company')
        .where('company.user_id = :userId', { userId: user.id })
        .getMany();
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.usersRepository.findOne({ where: { email: updateUserDto.email } });
      if (existingUser) {
        throw new ConflictException('Email already in use');
      }
    }

    Object.assign(user, updateUserDto);
    return this.usersRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
    return { message: 'User deleted successfully' };
  }

  async addSocialMedia(userId: string, platform: string, url: string) {
    const user = await this.findOne(userId);
    const socialMedia = this.socialMediaRepository.create({
      user: user,
      platform: platform as 'facebook' | 'twitter' | 'youtube' | 'instagram' | 'linkedin' | 'other',
      url,
    });
    return this.socialMediaRepository.save(socialMedia);
  }

  async removeSocialMedia(userId: string, platform: string) {
    await this.socialMediaRepository.delete({ 
      user: { id: userId },
      platform: platform as 'facebook' | 'twitter' | 'youtube' | 'instagram' | 'linkedin' | 'other'
    });
    return { message: 'Social media removed successfully' };
  }

  async updateIndividualProfile(userId: string, updateData: Partial<Individual>) {
    const user = await this.findOne(userId);
    if (user.type !== 'individual') {
      throw new BadRequestException('User is not an individual');
    }

    const individual = await this.individualsRepository.findOne({ where: { user_id: userId } });
    if (!individual) {
      throw new NotFoundException('Individual profile not found');
    }

    Object.assign(individual, updateData);
    return this.individualsRepository.save(individual);
  }

  async updateCompanyProfile(userId: string, updateData: Partial<Company>) {
    const user = await this.findOne(userId);
    if (user.type !== 'company') {
      throw new BadRequestException('User is not a company');
    }

    const company = await this.companiesRepository.findOne({ where: { user_id: userId } });
    if (!company) {
      throw new NotFoundException('Company profile not found');
    }

    Object.assign(company, updateData);
    return this.companiesRepository.save(company);
  }

  async addMediaTypesToIndividual(userId: string, mediaTypeIds: number[]) {
    const user = await this.findOne(userId);
    if (user.type !== 'individual') {
      throw new BadRequestException('User is not an individual');
    }

    const mediaTypes = await this.mediaTypeRepository.findBy({ id: In(mediaTypeIds) });
    if (mediaTypes.length !== mediaTypeIds.length) {
      throw new NotFoundException('One or more media types not found');
    }

    const individual = await this.individualsRepository.findOne({
      where: { user_id: userId },
      relations: ['media_types'],
    });
    individual.media_types = [...individual.media_types, ...mediaTypes];
    return this.individualsRepository.save(individual);
  }

  async removeMediaTypesFromIndividual(userId: string, mediaTypeIds: number[]) {
    const user = await this.findOne(userId);
    if (user.type !== 'individual') {
      throw new BadRequestException('User is not an individual');
    }

    const individual = await this.individualsRepository.findOne({
      where: { user_id: userId },
      relations: ['media_types'],
    });
    individual.media_types = individual.media_types.filter(
      mediaType => !mediaTypeIds.includes(mediaType.id),
    );
    return this.individualsRepository.save(individual);
  }

  async addAnalysisSpecialtiesToIndividual(userId: string, specialtyIds: number[]) {
    const user = await this.findOne(userId);
    if (user.type !== 'individual') {
      throw new BadRequestException('User is not an individual');
    }

    const specialties = await this.analysisSpecialtyRepository.findBy({ id: In(specialtyIds) });
    if (specialties.length !== specialtyIds.length) {
      throw new NotFoundException('One or more specialties not found');
    }

    const individual = await this.individualsRepository.findOne({
      where: { user_id: userId },
      relations: ['analysis_specialties'],
    });
    individual.analysis_specialties = [...individual.analysis_specialties, ...specialties];
    return this.individualsRepository.save(individual);
  }

  async removeAnalysisSpecialtiesFromIndividual(userId: string, specialtyIds: number[]) {
    const user = await this.findOne(userId);
    if (user.type !== 'individual') {
      throw new BadRequestException('User is not an individual');
    }

    const individual = await this.individualsRepository.findOne({
      where: { user_id: userId },
      relations: ['analysis_specialties'],
    });
    individual.analysis_specialties = individual.analysis_specialties.filter(
      specialty => !specialtyIds.includes(specialty.id),
    );
    return this.individualsRepository.save(individual);
  }

  async addRequiredServicesToCompany(userId: string, mediaTypeIds: number[]) {
    const user = await this.findOne(userId);
    if (user.type !== 'company') {
      throw new BadRequestException('User is not a company');
    }

    const mediaTypes = await this.mediaTypeRepository.findBy({ id: In(mediaTypeIds) });
    if (mediaTypes.length !== mediaTypeIds.length) {
      throw new NotFoundException('One or more media types not found');
    }

    const company = await this.companiesRepository.findOne({
      where: { user_id: userId },
      relations: ['required_services'],
    });
    company.required_services = [...company.required_services, ...mediaTypes];
    return this.companiesRepository.save(company);
  }

  async removeRequiredServicesFromCompany(userId: string, mediaTypeIds: number[]) {
    const user = await this.findOne(userId);
    if (user.type !== 'company') {
      throw new BadRequestException('User is not a company');
    }

    const company = await this.companiesRepository.findOne({
      where: { user_id: userId },
      relations: ['required_services'],
    });
    company.required_services = company.required_services.filter(
      mediaType => !mediaTypeIds.includes(mediaType.id),
    );
    return this.companiesRepository.save(company);
  }
}