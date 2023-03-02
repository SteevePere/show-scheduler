import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateIf, ValidateNested } from "class-validator";

import { BaseEntityObject } from "../../shared/objects/base-entity.object";
import { FavoriteObject } from "./favorite.object";

export class FavoriteCategoryObject extends BaseEntityObject {
  @ApiProperty({
    description: 'Internal id of the User',
    example: 'e69ce218-d3b3-4fd7-98d4-dd8fb27e9152',
  })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'Internal id of the Parent Category',
    example: 'e69ce218-d3b3-4fd7-98d4-dd8fb27e9152',
    nullable: true,
  })
  @ValidateIf((object, value) => value !== null)
  @IsNotEmpty()
  @IsString()
  parentId: string | null;

  @ApiProperty({
    description: 'Name of the Category',
    example: 'Category 1',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'List of Favorites in Category',
    type: [FavoriteObject],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested()
  favorites?: FavoriteObject[];

  @ApiPropertyOptional({
    description: 'List of children Categories',
    type: [FavoriteCategoryObject],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested()
  children?: FavoriteCategoryObject[];
}
