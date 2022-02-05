import { Ctx, On, Scene, SceneEnter } from 'nestjs-telegraf';
import { TRANSACTION_ADD_SCENE, TRANSACTION_SELECT_SCENE } from '../constants/scenes.constants';
import { Context } from '../interfaces/context.interface';
import { transactionSelectKeyboard } from '../keyboards/transaction-select.keyboard';
import { TransactionEnum } from '../enums/transaction.enum';
import { TelegramStateService } from '../services/telegram-state.service';

@Scene(TRANSACTION_SELECT_SCENE)
export class TransactionSelectScene {
  constructor(private telegramStateService: TelegramStateService) {
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
      this.telegramStateService.setCurrentOperation(text);
      await ctx.scene.enter(TRANSACTION_ADD_SCENE);
    } else {
      await this.sceneEnter(ctx);
    }
  }
}
