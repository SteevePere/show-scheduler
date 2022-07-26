import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationConfig } from 'src/config/authentication.config';
import { EmailsModule } from '../emails/emails.module';
import { UserEntity } from '../users/entities/user.entity';
import { UsersService } from '../users/services/users.service';
import { AuthenticationController } from './controllers/authentication.controller';
import { AuthenticationService } from './services/authentication.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [AuthenticationConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forFeature([UserEntity]),
    EmailsModule,
  ],
  providers: [AuthenticationService, UsersService],
  exports: [AuthenticationService],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
