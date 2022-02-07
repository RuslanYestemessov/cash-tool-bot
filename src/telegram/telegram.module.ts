import { Module } from '@nestjs/common';
import { TelegramUpdate } from './telegram.update';
import { LoginScene } from './scenes/login.scene';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { TransactionSelectScene } from './scenes/transaction-select.scene';
import { TransactionAddScene } from './scenes/transaction-add.scene';
import { Transaction, TransactionSchema } from './schemas/transaction.schema';
import { TransactionService } from './services/transaction.service';
import { UserService } from './services/user.service';
import { CommentAddScene } from './scenes/comment-add.scene';

const scenes = [
  LoginScene,
  TransactionSelectScene,
  TransactionAddScene,
  CommentAddScene
];

const services = [
  TelegramUpdate,
  UserService,
  TransactionService
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
