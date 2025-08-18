import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { Individual } from './entities/individual.entity';
import { Company } from './entities/company.entity';
import { SocialMedia } from './entities/social-media.entity';
import { MediaType } from '../media-types/entities/media-type.entity';
import { AnalysisSpecialty } from './entities/analysis-specialty.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User, 
      Individual, 
      Company, 
      SocialMedia, 
      MediaType, 
      AnalysisSpecialty
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}