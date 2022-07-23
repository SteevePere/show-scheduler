import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([FileEntity])],
  providers: [],
  exports: [],
  controllers: [],
})
export class FilesModule {}
