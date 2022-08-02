import * as path from 'path';

import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { EmailsConfig } from 'src/config/emails.config';
import { EmailsService } from './services/emails.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EmailsConfig],
      envFilePath: ['.env'],
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule.forFeature(EmailsConfig)],
      useFactory: (emailsConfig: ConfigType<typeof EmailsConfig>) => ({
        transport: {
          host: emailsConfig.host,
          port: emailsConfig.port,
          secure: emailsConfig.secure === 'true' ? true : false,
          auth: {
            user: emailsConfig.authentication.user,
            pass: emailsConfig.authentication.password,
          },
        },
        defaults: {
          from: emailsConfig.from,
        },
        template: {
          dir: path.join(process.cwd(), 'src/modules/emails/templates/emails'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
        options: {
          partials: {
            dir: path.join(
              process.cwd(),
              'src/modules/emails/templates/partials',
            ),
            options: {
              strict: true,
            },
          },
        },
      }),
      inject: [EmailsConfig.KEY],
    }),
  ],
  providers: [EmailsService],
  exports: [EmailsService],
  controllers: [],
})
export class EmailsModule {}
