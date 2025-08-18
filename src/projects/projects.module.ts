import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Project } from './entities/project.entity';
import { Offer } from './entities/offer.entity';
import { Rating } from './entities/rating.entity';
import { Company } from '../users/entities/company.entity';
import { User } from '../users/entities/user.entity';
import { MediaType } from '../media-types/entities/media-type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Project,
      Offer,
      Rating,
      Company,  // أضف هذا
      User,     // أضف هذا
      MediaType // أضف هذا
    ]),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}