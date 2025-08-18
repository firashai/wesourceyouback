import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('content')
@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  create(@Body() createContentDto: CreateContentDto, @Req() req) {
    return this.contentService.create(createContentDto, req.user);
  }

  @Get()
  findAll() {
    return this.contentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contentService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateContentDto: UpdateContentDto, @Req() req) {
    return this.contentService.update(id, updateContentDto, req.user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string, @Req() req) {
    return this.contentService.remove(id, req.user);
  }

  @Post(':id/view')
  incrementViews(@Param('id') id: string) {
    return this.contentService.incrementViews(id);
  }

  @Post(':id/download')
  incrementDownloads(@Param('id') id: string) {
    return this.contentService.incrementDownloads(id);
  }

  @Get('tags/all')
  findAllTags() {
    return this.contentService.findAllTags();
  }

  @Post('tags')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  createTag(@Body('name') name: string) {
    return this.contentService.createTag(name);
  }

  @Delete('tags/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  removeTag(@Param('id') id: string) {
    return this.contentService.removeTag(+id);
  }
}