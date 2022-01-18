import { Ctx, On, Scene, SceneEnter } from 'nestjs-telegraf';
import { HELLO_SCENE } from '../constants/scenes.constants';
import { Context } from '../interfaces/context.interface';
import { helloKeyboard } from '../keyboards/hello.keyboard';
import { HELLO_MESSAGE } from '../constants/messages.constants';

@Scene(HELLO_SCENE)
export class HelloScene {
  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: Context) {
    console.log(`${ctx.from.username} entered ${HELLO_SCENE}`);
    await ctx.telegram.sendMessage(ctx.chat.id, HELLO_MESSAGE, {
      reply_markup: helloKeyboard
    });
  }

  @On('contact')
  async authorization(@Ctx() ctx: Context) {
    await ctx.scene.leave();
    await ctx.telegram.sendMessage(ctx.chat.id, 'Вы не авторизованы', {
      allow_sending_without_reply: true,
      reply_markup: {
        remove_keyboard: true
      }
    });
    console.log(`${ctx.from.username} authorized`);
  }
}
