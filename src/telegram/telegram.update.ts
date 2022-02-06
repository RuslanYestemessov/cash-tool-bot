import { Ctx, On, Start, Update } from 'nestjs-telegraf';
import { Context } from './interfaces/context.interface';
import { LOGIN_SCENE } from './constants/scenes.constants';
import { START_COMMAND_ERROR } from './constants/messages.constants';
import { TransactionService } from './services/transaction.service';

@Update()
export class TelegramUpdate {
  constructor(private transactionService: TransactionService) {
  }
  @Start()
  start(@Ctx() ctx: Context) {
    if (ctx.scene?.current?.id !== LOGIN_SCENE) {
      ctx.scene.enter(LOGIN_SCENE);
    } else {
      return START_COMMAND_ERROR;
    }
  }

  @On('callback_query')
  async callbackQuery(@Ctx() ctx: Context) {
    // @ts-ignore
    const messageId = +ctx.callbackQuery?.data
    if (!isNaN(messageId)) {
      const deletedTransaction = await this.transactionService.removeTransaction(messageId);
      if (deletedTransaction) {
        return `Транзакция ${deletedTransaction.transactionType} на сумму ${deletedTransaction.transaction} удалена`
      } else {
        return 'Такой транзакции не существует, она была удалена ранее'
      }
    }
  }
}
