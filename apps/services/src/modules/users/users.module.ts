import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserShowEntity } from './entities/user-show.entity';
import { UserEntity } from './entities/user.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserShowEntity])],
  providers: [],
  exports: [],
  controllers: [],
})
export class UsersModule {}
