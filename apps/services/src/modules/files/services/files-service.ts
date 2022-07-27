import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaveFileData, SaveFileResult } from '../dto/save-file.dto';
import { FileEntity } from '../entities/file.entity';
import { createFileObjectFromEntity } from '../transformers/file-object.transformer';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly filesRepository: Repository<FileEntity>,
  ) {}

  async saveFile(data: SaveFileData): Promise<SaveFileResult> {
    const { filePath } = data;
    try {
      const fileToSave = this.filesRepository.create({
        filePath,
      });
      const fileEntity = await this.filesRepository.save(fileToSave);

      return { file: createFileObjectFromEntity({ fileEntity }) };
    } catch (error) {
      throw new InternalServerErrorException(
        'Error when trying to save File',
        error,
      );
    }
  }
}
