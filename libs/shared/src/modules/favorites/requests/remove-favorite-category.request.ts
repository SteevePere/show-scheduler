import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class RemoveFavoriteCategoryRequest {
  @ApiProperty({
    description: 'Internal id of the Category to delete',
    example: '9ce88aab-034c-44a8-b7b1-dc687d8bd442',
  })
  @IsUUID()
  @IsNotEmpty()
  categoryId: string;
}