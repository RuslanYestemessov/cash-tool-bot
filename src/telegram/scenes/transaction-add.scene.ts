import { Ctx, On, Scene, SceneEnter } from 'nestjs-telegraf';
import { TRANSACTION_ADD_SCENE, TRANSACTION_SELECT_SCENE } from '../constants/scenes.constants';
import { Context } from '../interfaces/context.interface';
import { TransactionService } from '../services/transaction.service';
import { TelegramStateService } from '../services/telegram-state.service';

@Scene(TRANSACTION_ADD_SCENE)
export class TransactionAddScene {
  constructor(
    private readonly addTransactionService: TransactionService,
    private telegramStateService: TelegramStateService
  ) {
  }

  @SceneEnter()
  async sceneEnter(@Ctx() ctx: Context) {
    await ctx.telegram.sendMessage(ctx.from.id, 'Введите сумму', {
      reply_markup: {
        resize_keyboard: true,
        keyboard: [
          [{ text: 'Назад' }]
        ]
      }
    });
  }

  @On('text')
  async addTransaction(@Ctx() ctx: Context) {
    // @ts-ignore
    const massage = ctx.message.text;
    if (!isNaN(massage)) {
      const currentUserId = this.telegramStateService.getCurrentUser;
      const currentOperation = this.telegramStateService.getCurrentOperation;
      await this.addTransactionService.addTransaction(Number(massage), currentUserId, currentOperation);
      return 'Transaction added successfully';
    } else if (massage === 'Назад') {
      await ctx.scene.enter(TRANSACTION_SELECT_SCENE);
    } else {
      ctx.telegram.sendMessage(ctx.from.id, 'Введите корректную сумму');
    }
  }
}
