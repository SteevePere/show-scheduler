import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateFavoriteCategoryRequest {
  @ApiPropertyOptional({
    description: 'Name of the Category',
    example: 'Test category',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;
    
  @ApiPropertyOptional({
    description: 'Internal id of the parent Category',
    example: 'ab321168-945d-42fc-afdb-0efec1e3dedf',
  })
  @IsOptional()
  @IsUUID()
  @IsNotEmpty()
  parentId?: string;
}