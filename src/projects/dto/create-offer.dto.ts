import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateOfferDto {
  @IsString()
  @IsOptional()
  message?: string;

  @IsNumber()
  @IsOptional()
  proposed_budget?: number;

  @IsNumber()
  @IsOptional()
  proposed_timeline?: number;
}