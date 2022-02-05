import { Module } from '@nestjs/common';
import { TelegramUpdate } from './telegram.update';
import { LoginScene } from './scenes/login.scene';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { AuthorizationService } from './services/authotization.service';
import { TransactionSelectScene } from './scenes/transaction-select.scene';
import { TransactionAddScene } from './scenes/transaction-add.scene';
import { Transaction, TransactionSchema } from './schemas/transaction.schema';
import { TelegramStateService } from './services/telegram-state.service';
import { AddTransactionService } from './services/add-transaction.service';

const scenes = [
  LoginScene,
  TransactionSelectScene,
  TransactionAddScene
];

const services = [
  TelegramUpdate,
  AuthorizationService,
  TelegramStateService,
  AddTransactionService
];

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Transaction.name, schema: TransactionSchema }
    ])
  ],
  providers: [
    ...services,
    ...scenes
  ]
})
export class TelegramModule {
}
