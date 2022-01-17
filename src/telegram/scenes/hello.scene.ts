import { Ctx, On, Scene, SceneEnter } from 'nestjs-telegraf';
import { HELLO_SCENE } from '../telegram.constants';
import { Context } from '../interfaces/context.interface';
import { helloKeyboard } from '../keyboards/hello.keyboard';

@Scene(HELLO_SCENE)
export class HelloScene {
  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: Context) {
    await ctx.telegram.sendMessage(ctx.chat.id, 'Приветствие...', {
      reply_markup: helloKeyboard
    });
  }

  @On('contact')
  authorization(@Ctx() ctx: Context) {
    return JSON.stringify(ctx.message)
  }
}
