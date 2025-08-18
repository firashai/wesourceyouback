import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MediaTypesModule } from './media-types/media-types.module';
import { ContentModule } from './content/content.module';
import { ProjectsModule } from './projects/projects.module';

// Entities
import { User } from './users/entities/user.entity';
import { Individual } from './users/entities/individual.entity';
import { Company } from './users/entities/company.entity';
import { SocialMedia } from './users/entities/social-media.entity';
import { AnalysisSpecialty } from './users/entities/analysis-specialty.entity';
import { MediaType } from './media-types/entities/media-type.entity';
import { MediaContent } from './content/entities/content.entity';
import { Tag } from './content/entities/tag.entity';
import { Project } from './projects/entities/project.entity';
import { Offer } from './projects/entities/offer.entity';
import { Rating } from './projects/entities/rating.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [
          User,
          Individual,
          Company,
          SocialMedia,
          AnalysisSpecialty,
          MediaType,
          MediaContent,
          Tag,
          Project,
          Offer,
          Rating,
        ],
        synchronize: configService.get<string>('NODE_ENV') !== 'production',
        logging: configService.get<string>('NODE_ENV') !== 'production',
        autoLoadEntities: true,
      }),
    }),
    AuthModule,
    UsersModule,
    MediaTypesModule,
    ContentModule,
    ProjectsModule,
  ],
})
export class AppModule {}