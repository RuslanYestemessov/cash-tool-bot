import { Module } from '@nestjs/common';
import { TelegramUpdate } from './telegram.update';
import { HelloScene } from './scenes/hello.scene';

@Module({
  providers: [TelegramUpdate, HelloScene]
})
export class TelegramModule {
}
