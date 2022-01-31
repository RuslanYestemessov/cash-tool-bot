import { Module } from '@nestjs/common';
import { TelegramUpdate } from './telegram.update';
import { LoginScene } from './scenes/login.scene';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { AuthorizationService } from './services/authotization.service';
import { TransactionSelectScene } from './scenes/transaction-select.scene';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ])
  ],
  providers: [TelegramUpdate, LoginScene, AuthorizationService, TransactionSelectScene]
})
export class TelegramModule {
}
