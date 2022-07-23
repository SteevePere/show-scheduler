import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { ServerConfig } from './config/server.config';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { FilesModule } from './modules/files/files.module';
import { ShowsModule } from './modules/shows/shows.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [ServerConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    AuthenticationModule,
    UsersModule,
    ShowsModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
