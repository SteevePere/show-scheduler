import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { FilesService } from './services/files-service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([FileEntity])],
  providers: [FilesService],
  exports: [FilesService],
  controllers: [],
})
export class FilesModule {}
