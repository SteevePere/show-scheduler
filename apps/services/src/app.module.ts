import { HttpException, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SentryInterceptor, SentryModule } from '@ntegral/nestjs-sentry';
import { getConnectionOptions } from 'typeorm';
import { AuthenticationConfig } from './config/authentication.config';
import { SecurityConfig } from './config/security.config';
import { SentryConfig } from './config/sentry.config';
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
      load: [ServerConfig, SecurityConfig, SentryConfig, AuthenticationConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    SentryModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dsn: configService.get<string>('sentry.dsn'),
        debug: true,
        environment: 'development',
        logLevels: ['debug'],
        tracesSampleRate: 1.0,
      }),
      inject: [ConfigService],
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
    {
      provide: APP_INTERCEPTOR,
      useFactory: () =>
        new SentryInterceptor({
          filters: [
            {
              type: HttpException,
              filter: (exception: HttpException) => 500 > exception.getStatus(), // Only report 500 errors
            },
          ],
        }),
    },
  ],
})
export class AppModule {}
