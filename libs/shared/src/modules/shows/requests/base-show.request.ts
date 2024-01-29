import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumberString,
  IsUUID,
  ValidateIf
} from 'class-validator';

export class BaseShowRequest {
  @ApiPropertyOptional({
    description: 'Internal id of the Show - Required if externalId not provided',
    example: 'ab321168-945d-42fc-afdb-0efec1e3dedf',
  })
  @ValidateIf((request) => !request.externalId)
  @IsUUID()
  @IsNotEmpty()
  id?: string;

  @ApiPropertyOptional({
    description: 'External id of the Show - Required if id not provided',
    example: 1,
  })
  @ValidateIf((request) => !request.id)
  @IsNumberString()
  externalId?: number;
}