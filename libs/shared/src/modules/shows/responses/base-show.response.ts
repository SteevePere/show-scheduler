import { ApiProperty } from '@nestjs/swagger';
import { IsObject, ValidateNested } from 'class-validator';

import { ShowObject } from '../objects/show.object';

export class BaseShowResponse {
  @ApiProperty({
    description: 'Show object targeted by the request',
  })
  @IsObject()
  @ValidateNested()
  show: ShowObject;
}