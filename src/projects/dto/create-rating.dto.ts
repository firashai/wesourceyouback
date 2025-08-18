import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateRatingDto {
  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;

  @IsString()
  @IsOptional()
  comment?: string;
}