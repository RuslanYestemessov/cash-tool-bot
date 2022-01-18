import { Module } from '@nestjs/common';
import { TelegramUpdate } from './telegram.update';
import { HelloScene } from './scenes/hello.scene';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ])
  ],
  providers: [TelegramUpdate, HelloScene]
})
export class TelegramModule {
}
