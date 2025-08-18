import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Post(':id/social-media')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  addSocialMedia(
    @Param('id') id: string,
    @Body('platform') platform: string,
    @Body('url') url: string,
  ) {
    return this.usersService.addSocialMedia(id, platform, url);
  }

  @Delete(':id/social-media/:platform')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  removeSocialMedia(@Param('id') id: string, @Param('platform') platform: string) {
    return this.usersService.removeSocialMedia(id, platform);
  }

  @Patch(':id/individual-profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  updateIndividualProfile(@Param('id') id: string, @Body() updateData: any) {
    return this.usersService.updateIndividualProfile(id, updateData);
  }

  @Patch(':id/company-profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  updateCompanyProfile(@Param('id') id: string, @Body() updateData: any) {
    return this.usersService.updateCompanyProfile(id, updateData);
  }

  @Post(':id/media-types')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  addMediaTypes(@Param('id') id: string, @Body('mediaTypeIds') mediaTypeIds: number[]) {
    return this.usersService.addMediaTypesToIndividual(id, mediaTypeIds);
  }

  @Delete(':id/media-types')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  removeMediaTypes(@Param('id') id: string, @Body('mediaTypeIds') mediaTypeIds: number[]) {
    return this.usersService.removeMediaTypesFromIndividual(id, mediaTypeIds);
  }

  @Post(':id/analysis-specialties')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  addAnalysisSpecialties(@Param('id') id: string, @Body('specialtyIds') specialtyIds: number[]) {
    return this.usersService.addAnalysisSpecialtiesToIndividual(id, specialtyIds);
  }

  @Delete(':id/analysis-specialties')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  removeAnalysisSpecialties(@Param('id') id: string, @Body('specialtyIds') specialtyIds: number[]) {
    return this.usersService.removeAnalysisSpecialtiesFromIndividual(id, specialtyIds);
  }

  @Post(':id/required-services')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  addRequiredServices(@Param('id') id: string, @Body('mediaTypeIds') mediaTypeIds: number[]) {
    return this.usersService.addRequiredServicesToCompany(id, mediaTypeIds);
  }

  @Delete(':id/required-services')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  removeRequiredServices(@Param('id') id: string, @Body('mediaTypeIds') mediaTypeIds: number[]) {
    return this.usersService.removeRequiredServicesFromCompany(id, mediaTypeIds);
  }
}