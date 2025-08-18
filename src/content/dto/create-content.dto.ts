import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateContentDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(['photo', 'video', 'audio'])
  type: 'photo' | 'video' | 'audio';

  @IsNumber()
  price: number;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsBoolean()
  @IsOptional()
  is_exclusive?: boolean;

  @IsUrl()
  thumbnail_url: string;

  @IsUrl()
  content_url: string;

  @IsUrl()
  @IsOptional()
  watermarked_preview_url?: string;

  @IsArray()
  @IsOptional()
  tag_ids?: number[];
}