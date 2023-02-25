import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsString, ValidateNested } from "class-validator";

import { BaseEntityObject } from "../../shared/objects/base-entity.object";
import { ShowObject } from "../../shows/objects/show.object";

export class FavoriteObject extends BaseEntityObject {
  @ApiProperty({
    description: 'Whether User wants to be notified of upcoming Episodes',
    example: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  isNotificationEnabled: boolean;

  @ApiProperty({
    description: 'Internal id of the User',
    example: 'e69ce218-d3b3-4fd7-98d4-dd8fb27e9152',
  })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'Internal id of the Show',
    example: 'e69ce218-d3b3-4fd7-98d4-dd8fb27e9152',
  })
  @IsNotEmpty()
  @IsString()
  showId: string;

  @ApiProperty({
    description: 'Show favorited by the User',
    type: ShowObject,
  })
  @ValidateNested()
  @Type(() => ShowObject)
  show: ShowObject;
}
