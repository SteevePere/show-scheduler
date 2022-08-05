import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUrl, ValidateIf } from "class-validator";

import { IsSafeInt } from "../../../decorators/validation/is-safe-integer.decorator";
import { BaseEntityObject } from "../../shared/objects/base-entity.object";

export class EpisodeObject extends BaseEntityObject {
  @ApiPropertyOptional({
    description: 'Internal id of the parent Season',
    example: 'ab321168-945d-42fc-afdb-0efec1e3dedf',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  seasonId?: string;

  @ApiProperty({
    description: 'External id of the Episode',
    example: 1,
  })
  @IsSafeInt()
  externalId: number;

  @ApiProperty({
    description: 'Name of the Episode',
    example: 'Fly',
    nullable: true,
  })
  @ValidateIf((object, value) => value !== null)
  @IsNotEmpty()
  @IsString()
  name: string | null;

  @ApiProperty({
    description: 'Number of the Episode',
    example: 1,
    nullable: true,
  })
  @IsSafeInt()
  number: number;

  @ApiProperty({
    description: 'Summary of the Episode',
    example: 'Walt and Jesse attempt to cover their tracks and distance themselves from Tuco, but they soon find that business is taking a hit along with their financial situation.',
    nullable: true,
  })
  @ValidateIf((object, value) => value !== null)
  @IsString()
  summary: string |  null;

  @ApiProperty({
    description: 'Air date of the Episode',
    example: '1994-09-28T21:53:00.000Z',
  })
  @IsString()
  @IsNotEmpty()
  @IsDateString()
  airDate?: Date;

  @ApiProperty({
    description: 'URL of the image of the Episode',
    example: 'https://static.tvmaze.com/uploads/images/medium_landscape/405/1012709.jpg',
  })
  @IsUrl()
  imageUrl: string;
}
