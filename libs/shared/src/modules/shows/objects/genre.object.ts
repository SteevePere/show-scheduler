import { IsNotEmpty, IsString } from "class-validator";

import { BaseEntityObject } from "../../shared/objects/base-entity.object";

export class GenreObject extends BaseEntityObject {
  @IsString()
  @IsNotEmpty()
  name: string;
}