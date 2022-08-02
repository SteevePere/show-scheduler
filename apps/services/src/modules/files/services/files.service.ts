import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { SaveFileData, SaveFileResult } from '../dto/save-file.dto';
import { FileEntity } from '../entities/file.entity';
import { createFileObjectFromEntity } from '../transformers/file-object.transformer';

@Injectable()
export class FilesService {
  constructor(
    private readonly databaseConnection: Connection,
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

  async removeObsoleteFiles(): Promise<void> {
    await this.databaseConnection.query(
      `DELETE
        FROM files WHERE files.id IN
        (SELECT files.id from files LEFT JOIN shows ON shows."imageId" = files.id
        LEFT JOIN seasons ON seasons."imageId" = files.id
        LEFT JOIN episodes ON episodes."imageId" = files.id
        WHERE shows.id IS NULL AND seasons.id IS NULL AND episodes.id IS NULL);`,
      [],
    );
  }
}
