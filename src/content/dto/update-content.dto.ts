import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateContentDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  location?: string;

  @IsBoolean()
  @IsOptional()
  is_exclusive?: boolean;

  @IsEnum(['active', 'pending', 'rejected'])
  @IsOptional()
  status?: 'active' | 'pending' | 'rejected';

  @IsUrl()
  @IsOptional()
  thumbnail_url?: string;

  @IsUrl()
  @IsOptional()
  content_url?: string;

  @IsUrl()
  @IsOptional()
  watermarked_preview_url?: string;

  @IsArray()
  @IsOptional()
  tag_ids?: number[];
}