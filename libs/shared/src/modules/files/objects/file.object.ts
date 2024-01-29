import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { BaseEntityObject } from '../../shared/objects/base-entity.object';
import { FileSourceTypeEnum } from '../enums/file-source-type.enum';

export class FileObject extends BaseEntityObject {
  @ApiProperty({
    description: 'Path (url) of the file',
    example: 'https://static.tvmaze.com/uploads/images/medium_portrait/0/2400.jpg',
  })
  @IsString()
  @IsNotEmpty()
  filePath: string;

  @ApiProperty({
    description: 'Source of the file, whether it is stored "locally" or on the web',
    enum: FileSourceTypeEnum,
    example: FileSourceTypeEnum.WEB,
  })
  @IsEnum(FileSourceTypeEnum)
  sourceType: FileSourceTypeEnum;
}