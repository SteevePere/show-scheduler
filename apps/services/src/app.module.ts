import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { AuthenticationConfig } from './config/authentication.config';
import { ServerConfig } from './config/server.config';
import { JwtAuthenticationGuard } from './core/guards/authentication.guard';
import { JwtStrategy } from './core/strategies/jwt.strategy';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { EmailsModule } from './modules/emails/emails.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { FilesModule } from './modules/files/files.module';
import { ShowsModule } from './modules/shows/shows.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [ServerConfig, AuthenticationConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    ScheduleModule.forRoot(),
    AuthenticationModule,
    UsersModule,
    ShowsModule,
    FavoritesModule,
    FilesModule,
    EmailsModule,
  ],
  controllers: [],
  providers: [
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthenticationGuard,
    },
  ],
})
export class AppModule {}
