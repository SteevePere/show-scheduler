import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  ValidateIf,
  ValidateNested
} from 'class-validator';

import {
  IsSafeInt
} from '../../../decorators/validation/is-safe-integer.decorator';
import { BaseEntityObject } from '../../shared/objects/base-entity.object';
import { SeasonObject } from './season.object';

export class ShowObject extends BaseEntityObject {
  @ApiProperty({
    description: 'External id of the Show',
    example: 1,
  })
  @IsSafeInt()
  externalId: number;

  @ApiProperty({
    description: 'Name of the Show',
    example: 'Breaking Bad',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Summary of the Show',
    example: 'Breaking Bad follows protagonist Walter White, a chemistry teacher who lives in New Mexico with his wife and teenage son who has cerebral palsy.',
    nullable: true,
  })
  @ValidateIf((object, value) => value !== null)
  @IsString()
  summary: string | null;

  @ApiProperty({
    description: 'Language of the Show',
    example: 'English',
  })
  @IsNotEmpty()
  @IsString()
  language: string;

  @ApiProperty({
    description: 'Rating of the Show',
    example: 9.2,
    nullable: true,
  })
  @ValidateIf((object, value) => value !== null)
  @IsNumber()
  rating: number | null;

  @ApiPropertyOptional({
    description: 'URL of the image of the Show',
    example: 'https://static.tvmaze.com/uploads/images/medium_landscape/405/1012709.jpg',
    nullable: true,
  })
  @IsOptional()
  @ValidateIf((object, value) => value !== null)
  @IsUrl()
  imageUrl?: string | null;

  @ApiProperty({
    description: 'Genres of the Show',
    example: ['Drama', 'Crime'],
  })
  @IsArray()
  genres: string[];

  @ApiPropertyOptional({
    description: 'Seasons of the Show',
    type: [SeasonObject],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested()
  seasons?: SeasonObject[];

  @ApiPropertyOptional({
    description: 'Date of last time this Show was added to a User\'s Favorites',
    example: '1991-10-16T21:50:00.000Z',
    nullable: true,
  })
  @IsOptional()
  @ValidateIf((object, value) => value !== null)
  @IsString()
  @IsNotEmpty()
  @IsDateString()
  lastFavoritedAt?: Date | null;

  @ApiPropertyOptional({
    description: 'Whether current User has favorited this Show',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isFavoritedByUser?: boolean;
}