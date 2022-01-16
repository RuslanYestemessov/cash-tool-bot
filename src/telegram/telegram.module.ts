import { Module } from '@nestjs/common';
import { TelegramUpdate } from './telegram.update';

@Module({
  imports: [TelegramUpdate]
})
export class TelegramModule {
}
