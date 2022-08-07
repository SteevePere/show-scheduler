import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';

import { SecurityConfig } from 'src/config/security.config';
import { ServerConfig } from 'src/config/server.config';
import { ExampleModule } from 'src/modules/example/example.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [ServerConfig, SecurityConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    ScheduleModule.forRoot(),
    ExampleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
