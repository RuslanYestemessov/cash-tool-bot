import { Ctx, On, Scene, SceneEnter } from 'nestjs-telegraf';
import { HELLO_SCENE } from '../telegram.constants';
import { Context } from '../interfaces/context.interface';
import { helloKeyboard } from '../keyboards/hello.keyboard';

@Scene(HELLO_SCENE)
export class HelloScene {
  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: Context) {
    console.log(`${ctx.from.username}: onSceneEnter`);
    await ctx.telegram.sendMessage(ctx.chat.id, '123', {
      reply_markup: helloKeyboard
    });
  }

  @On('contact')
  authorization(@Ctx() ctx: Context) {
    return JSON.stringify(ctx.message);
  }
}
