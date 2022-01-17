import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { sessionMiddleware } from './telegram/middlewares/session.middleware';
import { TelegramModule } from './telegram/telegram.module';

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
        ],
        include: [TelegramModule]
      })
    }),
    TelegramModule
  ]
})
export class AppModule {
}
