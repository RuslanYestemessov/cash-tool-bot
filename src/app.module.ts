import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { TelegramUpdate } from './telegram/telegram.update';
import { sessionMiddleware } from './telegram/middlewares/session.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        token: configService.get('TG_TOKEN'),
        middlewares: [
          sessionMiddleware
        ]
      })
    }),
    TelegramUpdate
  ]
})
export class AppModule {
}
