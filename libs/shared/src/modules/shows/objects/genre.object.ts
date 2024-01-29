import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { BaseEntityObject } from '../../shared/objects/base-entity.object';

export class GenreObject extends BaseEntityObject {
  @ApiProperty({
    description: 'Name of the Genre',
    example: 'Comedy',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}