import { IsOptional, IsString, Matches, IsBoolean, IsInt, Min, Max } from 'class-validator';

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @Matches(/^\d{13}$/, { message: 'ISBN must be a 13-digit number' })
  ISBN?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  timesRead?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  downloads?: number;

  @IsOptional()
  @IsBoolean()
  isBestSeller?: boolean;

  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @IsOptional()
  @IsString()
  coverUrl?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(5)
  rating?: number;

  @IsOptional()
  @IsString()
  description?: string;
}
