import { IsNotEmpty, IsString, Matches, IsOptional } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsNotEmpty({ message: 'Author is required' })
  author: string;

  @IsNotEmpty({ message: 'ISBN is required' })
  @Matches(/^\d{13}$/, { message: 'ISBN must be a 13-digit number' })
  ISBN: string;

  @IsOptional()
  pdfUrl?: string;
}
