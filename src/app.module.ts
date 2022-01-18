import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { sessionMiddleware } from './telegram/middlewares/session.middleware';
import { TelegramModule } from './telegram/telegram.module';
import { MongooseModule } from '@nestjs/mongoose';

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
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGO_DB'),
        dbName: configService.get('DB_NAME'),
        w: 'majority',
        retryWrites: true
      })
    }),
    TelegramModule
  ]
})
export class AppModule {
}
