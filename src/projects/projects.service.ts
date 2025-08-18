import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Project } from './entities/project.entity';
import { Offer } from './entities/offer.entity';
import { Rating } from './entities/rating.entity';
import { User } from '../users/entities/user.entity';
import { Company } from '../users/entities/company.entity';
import { MediaType } from '../media-types/entities/media-type.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { CreateOfferDto } from './dto/create-offer.dto';
import { CreateRatingDto } from './dto/create-rating.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
    @InjectRepository(Rating)
    private ratingRepository: Repository<Rating>,
    @InjectRepository(Company)  // أضف هذا
    private companyRepository: Repository<Company>,
    @InjectRepository(User)     // أضف هذا
    private userRepository: Repository<User>,
    @InjectRepository(MediaType)
    private mediaTypeRepository: Repository<MediaType>,
  ) {}

  async create(createProjectDto: CreateProjectDto, user: User) {
    const company = await this.companyRepository.findOne({ where: { user_id: user.id } });
    if (!company) {
      throw new ForbiddenException('Only companies can create projects');
    }

    const project = this.projectRepository.create({
      ...createProjectDto,
      company,
    });

    if (createProjectDto.required_media_type_ids && createProjectDto.required_media_type_ids.length > 0) {
      const mediaTypes = await this.mediaTypeRepository.findBy({ 
        id: In(createProjectDto.required_media_type_ids) 
      });
      project.required_services = mediaTypes;
    }

    return this.projectRepository.save(project);
  }

  async findAll() {
    return this.projectRepository.find({
      relations: ['company', 'professional', 'required_services', 'offers', 'ratings'],
    });
  }

  async findOne(id: string) {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['company', 'professional', 'required_services', 'offers', 'ratings'],
    });
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }

  async update(id: string, updateData: Partial<Project>, user: User) {
    const project = await this.findOne(id);
    if (project.company.user_id !== user.id) {
      throw new ForbiddenException('You can only update your own projects');
    }

    Object.assign(project, updateData);
    return this.projectRepository.save(project);
  }

  async remove(id: string, user: User) {
    const project = await this.findOne(id);
    if (project.company.user_id !== user.id) {
      throw new ForbiddenException('You can only delete your own projects');
    }

    await this.projectRepository.remove(project);
    return { message: 'Project deleted successfully' };
  }

  async createOffer(projectId: string, createOfferDto: CreateOfferDto, user: User) {
    const project = await this.findOne(projectId);
    if (project.company.user_id === user.id) {
      throw new ForbiddenException('You cannot make an offer on your own project');
    }

    const offer = this.offerRepository.create({
      ...createOfferDto,
      project,
      professional: { user_id: user.id },
    });

    return this.offerRepository.save(offer);
  }

  async updateOfferStatus(offerId: string, status: string, user: User) {
    const offer = await this.offerRepository.findOne({
      where: { id: offerId },
      relations: ['project', 'project.company'],
    });

    if (!offer) {
      throw new NotFoundException('Offer not found');
    }

    if (offer.project.company.user_id !== user.id) {
      throw new ForbiddenException('Only the project owner can update offer status');
    }

    offer.status = status as 'pending' | 'accepted' | 'rejected' | 'withdrawn';
    return this.offerRepository.save(offer);
  }

  async createRating(projectId: string, createRatingDto: CreateRatingDto, user: User) {
    const project = await this.findOne(projectId);
    let ratedUser: User;

    if (project.company.user_id === user.id) {
      // Company is rating the professional
      if (!project.professional) {
        throw new ForbiddenException('Project has no professional assigned');
      }
      ratedUser = await this.userRepository.findOne({ where: { id: project.professional.user_id } });
    } else if (project.professional && project.professional.user_id === user.id) {
      // Professional is rating the company
      ratedUser = await this.userRepository.findOne({ where: { id: project.company.user_id } });
    } else {
      throw new ForbiddenException('You can only rate projects you participated in');
    }

    const rating = this.ratingRepository.create({
      ...createRatingDto,
      project,
      rated_by: user,
      rated_user: ratedUser,
    });

    return this.ratingRepository.save(rating);
  }

  async getProjectOffers(projectId: string, user: User) {
    const project = await this.findOne(projectId);
    if (project.company.user_id !== user.id) {
      throw new ForbiddenException('Only the project owner can view offers');
    }

    return this.offerRepository.find({
      where: { project: { id: projectId } },
      relations: ['professional'],
    });
  }

  async getUserProjects(userId: string) {
    return this.projectRepository.find({
      where: [
        { company: { user_id: userId } },
        { professional: { user_id: userId } },
      ],
      relations: ['company', 'professional', 'required_services'],
    });
  }
}