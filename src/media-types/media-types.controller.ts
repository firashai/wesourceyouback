import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MediaTypesService } from './media-types.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('media-types')
@Controller('media-types')
export class MediaTypesController {
  constructor(private readonly mediaTypesService: MediaTypesService) {}

  @Get()
  findAll() {
    return this.mediaTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mediaTypesService.findOne(+id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  create(@Body('name') name: string, @Body('description') description?: string) {
    return this.mediaTypesService.create(name, description);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body('name') name: string, @Body('description') description?: string) {
    return this.mediaTypesService.update(+id, name, description);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.mediaTypesService.remove(+id);
  }
}