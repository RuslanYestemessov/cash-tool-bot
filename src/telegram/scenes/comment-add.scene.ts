import { Ctx, On, Scene, SceneEnter } from 'nestjs-telegraf';
import { COMMENT_ADD_SCENE, TRANSACTION_SELECT_SCENE } from '../constants/scenes';
import { Context } from '../interfaces/context.interface';
import { TransactionService } from '../services/transaction.service';
import { BACK_BUTTON } from '../constants/buttons';

@Scene(COMMENT_ADD_SCENE)
export class CommentAddScene {
  constructor(private readonly transactionService: TransactionService) {
  }

  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: Context) {
    await ctx.telegram.sendMessage(ctx.from.id, 'Введите комментарий', {
      reply_markup: {
        resize_keyboard: true,
        keyboard: [
          [{ text: BACK_BUTTON }]
        ]
      }
    });
  }

  @On('text')
  async commentHandle(@Ctx() ctx: Context) {
    // @ts-ignore
    const comment = ctx.message.text;
    const { messageId } = ctx.scene.state as any;
    if (comment === BACK_BUTTON) {
      await ctx.scene.enter(TRANSACTION_SELECT_SCENE);
    } else {
      const transaction = await this.transactionService.getOneTransaction(messageId);
      transaction.comment = comment;
      await this.transactionService.addCommentForTransaction(messageId, transaction);
      await ctx.scene.enter(TRANSACTION_SELECT_SCENE);
    }
  }
}
