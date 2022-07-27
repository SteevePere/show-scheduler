import { FileObject, FileSourceTypeEnum } from '@scheduler/shared';

export class SaveFileData {
  filePath: string;
  sourceType?: FileSourceTypeEnum;
}

export class SaveFileResult {
  file: FileObject;
}
