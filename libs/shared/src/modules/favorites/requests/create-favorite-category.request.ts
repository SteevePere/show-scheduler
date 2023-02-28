import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateFavoriteCategoryRequest {
  @ApiProperty({
    description: 'Name of the new Category',
    example: 'Test category',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    description: 'Internal id of the parent Category',
    example: 'ab321168-945d-42fc-afdb-0efec1e3dedf',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  parentId?: string;

  @ApiPropertyOptional({
    description: 'Array of internal ids of favorites',
    example: ['ab321168-945d-42fc-afdb-0efec1e3dedf', 'ab321168-945d-42fc-afdb-0efec1e3dedg'],
  })
  @IsOptional()
  @IsArray()
  favorites?: string[];
}