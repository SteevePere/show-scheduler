import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUrl, ValidateIf } from "class-validator";

import { IsSafeInt } from "../../../decorators/validation/is-safe-integer.decorator";
import { BaseEntityObject } from "../../shared/objects/base-entity.object";

export class SeasonObject extends BaseEntityObject {
  @ApiPropertyOptional({
    description: 'Internal id of the parent Show',
    example: 'ab321168-945d-42fc-afdb-0efec1e3dedf',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  showId?: string;

  @ApiProperty({
    description: 'External id of the Season',
    example: 1,
  })
  @IsSafeInt()
  externalId: number;

  @ApiProperty({
    description: 'Name of the Season',
    example: 'Season 1',
    nullable: true,
  })
  @ValidateIf((object, value) => value !== null)
  @IsNotEmpty()
  @IsString()
  name: string | null;

  @ApiProperty({
    description: 'Number of the Season',
    example: 1,
    nullable: true,
  })
  @IsSafeInt()
  number: number;

  @ApiProperty({
    description: 'Summary of the Season',
    example: 'Awesome Season 1',
    nullable: true,
  })
  @ValidateIf((object, value) => value !== null)
  @IsString()
  summary: string |  null;

  @ApiProperty({
    description: 'URL of the image of the Season',
    example: 'https://static.tvmaze.com/uploads/images/medium_landscape/405/1012709.jpg',
    nullable: true,
  })
  @ValidateIf((object, value) => value !== null)
  @IsUrl()
  imageUrl: string | null;

  @ApiPropertyOptional({
    description: 'Premiere date of the Season',
    example: '1991-10-16T21:50:00.000Z',
    nullable: true,
  })
  @ValidateIf((object, value) => value !== null)
  @IsString()
  @IsNotEmpty()
  @IsDateString()
  premiereDate?: Date | null;

  @ApiPropertyOptional({
    description: 'End date of the Season',
    example: '1994-09-28T21:53:00.000Z',
    nullable: true,
  })
  @ValidateIf((object, value) => value !== null)
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsDateString()
  endDate?: Date | null;
}
