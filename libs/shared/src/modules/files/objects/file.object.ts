import { IsEnum, IsInt, IsNotEmpty, IsString } from "class-validator";

import { BaseEntityObject } from "../../shared/objects/base-entity.object";
import { FileSourceTypeEnum } from "../enums/file-source-type.enum";

export class FileObject extends BaseEntityObject {
  @IsInt()
  externalId: number;

  @IsString()
  @IsNotEmpty()
  filePath: string;

  @IsEnum(FileSourceTypeEnum)
  sourceType: FileSourceTypeEnum;
}