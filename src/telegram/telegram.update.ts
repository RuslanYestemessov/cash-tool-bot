import { Ctx, On, Start, Update } from 'nestjs-telegraf';
import { Context } from './interfaces/context.interface';
import { COMMENT_ADD_SCENE, LOGIN_SCENE } from './constants/scenes';
import { START_COMMAND_ERROR } from './constants/messages';
import { TransactionService } from './services/transaction.service';
import { TransactionActionsEnum } from './enums/transaction-actions.enum';

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
    const callbackData = ctx.callbackQuery?.data as string;
    // first element of matching is messageId
    const [messageId] = callbackData.match(/\d+/);
    if (callbackData.indexOf(TransactionActionsEnum.DELETE_TRANSACTION) !== -1) {
      const deletedTransaction = await this.transactionService.removeTransaction(messageId);
      if (deletedTransaction) {
        return `Транзакция ${deletedTransaction.transactionType} на сумму ${deletedTransaction.transaction} удалена`;
      } else {
        return 'Такой транзакции не существует, она была удалена ранее';
      }
    } else if (callbackData.indexOf(TransactionActionsEnum.ADD_COMMENT) !== -1) {
      await ctx.scene.enter(COMMENT_ADD_SCENE, {
        messageId
      });
    }
  }
}
