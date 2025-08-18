import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaTypesService } from './media-types.service';
import { MediaTypesController } from './media-types.controller';
import { MediaType } from './entities/media-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MediaType])],
  controllers: [MediaTypesController],
  providers: [MediaTypesService],
  exports: [MediaTypesService],
})
export class MediaTypesModule {}