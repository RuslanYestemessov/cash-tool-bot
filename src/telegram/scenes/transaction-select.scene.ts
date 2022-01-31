import { Ctx, On, Scene, SceneEnter } from 'nestjs-telegraf';
import { TRANSACTION_SELECT_SCENE } from '../constants/scenes.constants';
import { Context } from '../interfaces/context.interface';
import { transactionSelectKeyboard } from '../keyboards/transaction-select.keyboard';
import { TransactionEnum } from '../enums/transaction.enum';

@Scene(TRANSACTION_SELECT_SCENE)
export class TransactionSelectScene {
  @SceneEnter()
  async SceneEnter(@Ctx() ctx: Context) {
    await ctx.telegram.sendMessage(ctx.from.id, 'Выбери вид операции' , {
      reply_markup: transactionSelectKeyboard
    })
  }

  @On('text')
  async onText(@Ctx() ctx: Context) {
    // @ts-ignore
    const text = ctx.message.text;
    if (text === TransactionEnum.TRANSACTION_INCOME || text === TransactionEnum.TRANSACTION_OUTCOME) {
      await ctx.scene.enter(text);
    }
  }
}
