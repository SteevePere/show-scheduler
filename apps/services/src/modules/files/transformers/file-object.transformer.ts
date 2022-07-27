import { FileObject } from '@scheduler/shared';
import { createFromClass } from 'src/core/utils/transformers.util';
import { FileEntity } from '../entities/file.entity';

interface IFileTransformerData {
  fileEntity: FileEntity;
}

export function createFileObjectFromEntity(data: IFileTransformerData) {
  const {
    fileEntity: { id, filePath, sourceType, createdAt, updatedAt },
  } = data;

  return createFromClass(FileObject, {
    id,
    filePath,
    sourceType,
    createdAt,
    updatedAt,
  });
}
