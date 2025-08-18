import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Individual } from './entities/individual.entity';
import { Company } from './entities/company.entity';
import { SocialMedia } from './entities/social-media.entity';
import { MediaType } from '../media-types/entities/media-type.entity';
import { AnalysisSpecialty } from './entities/analysis-specialty.entity';

describe('UsersService', () => {
  let service: UsersService;

  const mockUsersRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  const mockIndividualsRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
  };

  const mockCompaniesRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
  };

  const mockSocialMediaRepository = {
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  const mockMediaTypeRepository = {
    find: jest.fn(),
    findBy: jest.fn(),
  };

  const mockAnalysisSpecialtyRepository = {
    find: jest.fn(),
    findBy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
        {
          provide: getRepositoryToken(Individual),
          useValue: mockIndividualsRepository,
        },
        {
          provide: getRepositoryToken(Company),
          useValue: mockCompaniesRepository,
        },
        {
          provide: getRepositoryToken(SocialMedia),
          useValue: mockSocialMediaRepository,
        },
        {
          provide: getRepositoryToken(MediaType),
          useValue: mockMediaTypeRepository,
        },
        {
          provide: getRepositoryToken(AnalysisSpecialty),
          useValue: mockAnalysisSpecialtyRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Add more test cases here
});