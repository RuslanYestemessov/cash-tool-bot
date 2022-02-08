import { Ctx, On, Scene, SceneEnter } from 'nestjs-telegraf';
import { TRANSACTION_ADD_SCENE, TRANSACTION_SELECT_SCENE } from '../constants/scenes';
import { Context } from '../interfaces/context.interface';
import { transactionSelectKeyboard } from '../keyboards/transaction-select.keyboard';
import { TransactionEnum } from '../enums/transaction.enum';
import { TransactionService } from '../services/transaction.service';
import { UserService } from '../services/user.service';

@Scene(TRANSACTION_SELECT_SCENE)
export class TransactionSelectScene {
  constructor(
    private transactionService: TransactionService,
    private userService: UserService
  ) {
  }

  @SceneEnter()
  async sceneEnter(@Ctx() ctx: Context) {
    await ctx.telegram.sendMessage(ctx.from.id, 'Выбери вид операции', {
      reply_markup: transactionSelectKeyboard
    });
  }

  @On('text')
  async onText(@Ctx() ctx: Context) {
    // @ts-ignore
    const text = ctx.message.text;
    if (text === TransactionEnum.TRANSACTION_INCOME || text === TransactionEnum.TRANSACTION_OUTCOME) {
      await ctx.scene.enter(TRANSACTION_ADD_SCENE, {
        transactionType: text
      });
    } else if (text === TransactionEnum.TRANSACTIONS_SHOW) {
      const { _id } = await this.userService.findOne(ctx.from.username);
      const dbTransactions = await this.transactionService.getAllTransactions(_id);
      let totalCash = 0;
      for (const transaction of dbTransactions) {
        if (transaction.transactionType === TransactionEnum.TRANSACTION_INCOME) {
          totalCash += transaction.transaction;
        } else if (transaction.transactionType === TransactionEnum.TRANSACTION_OUTCOME) {
          totalCash -= transaction.transaction;
        }
      }
      return `Ваш текущий баланс: ${totalCash}`;
    } else {
      await this.sceneEnter(ctx);
    }
  }
}
