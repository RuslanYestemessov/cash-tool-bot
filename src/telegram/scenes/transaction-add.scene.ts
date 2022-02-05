import { Ctx, On, Scene, SceneEnter } from 'nestjs-telegraf';
import { TRANSACTION_ADD_SCENE, TRANSACTION_SELECT_SCENE } from '../constants/scenes.constants';
import { Context } from '../interfaces/context.interface';
import { TransactionService } from '../services/transaction.service';
import { UserService } from '../services/user.service';

@Scene(TRANSACTION_ADD_SCENE)
export class TransactionAddScene {
  constructor(
    private readonly addTransactionService: TransactionService,
    private readonly userService: UserService
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
      const { _id } = await this.userService.findOne(ctx.from.username);
      // @ts-ignore
      const transactionType = ctx.scene.state.transactionType;
      await this.addTransactionService.addTransaction(Number(massage), _id, transactionType);
      return 'Transaction added successfully';
    } else if (massage === 'Назад') {
      await ctx.scene.enter(TRANSACTION_SELECT_SCENE);
    } else {
      ctx.telegram.sendMessage(ctx.from.id, 'Введите корректную сумму');
    }
  }
}