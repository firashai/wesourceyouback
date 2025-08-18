import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { CreateOfferDto } from './dto/create-offer.dto';
import { CreateRatingDto } from './dto/create-rating.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  create(@Body() createProjectDto: CreateProjectDto, @Req() req) {
    return this.projectsService.create(createProjectDto, req.user);
  }

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateData: any, @Req() req) {
    return this.projectsService.update(id, updateData, req.user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string, @Req() req) {
    return this.projectsService.remove(id, req.user);
  }

  @Post(':id/offers')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  createOffer(@Param('id') projectId: string, @Body() createOfferDto: CreateOfferDto, @Req() req) {
    return this.projectsService.createOffer(projectId, createOfferDto, req.user);
  }

  @Patch('offers/:id/status')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  updateOfferStatus(@Param('id') offerId: string, @Body('status') status: string, @Req() req) {
    return this.projectsService.updateOfferStatus(offerId, status, req.user);
  }

  @Post(':id/ratings')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  createRating(@Param('id') projectId: string, @Body() createRatingDto: CreateRatingDto, @Req() req) {
    return this.projectsService.createRating(projectId, createRatingDto, req.user);
  }

  @Get(':id/offers')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getProjectOffers(@Param('id') projectId: string, @Req() req) {
    return this.projectsService.getProjectOffers(projectId, req.user);
  }

  @Get('user/projects')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getUserProjects(@Req() req) {
    return this.projectsService.getUserProjects(req.user.id);
  }
}