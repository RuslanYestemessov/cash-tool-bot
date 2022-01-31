import { Ctx, On, Scene, SceneEnter, SceneLeave } from 'nestjs-telegraf';
import { LOGIN_SCENE, TRANSACTION_SELECT_SCENE } from '../constants/scenes.constants';
import { Context } from '../interfaces/context.interface';
import { helloKeyboard } from '../keyboards/hello.keyboard';
import { AUTH_COMPLETED, HELLO_MESSAGE, LOGIN_SCENE_ON_MSG } from '../constants/messages.constants';
import { AuthorizationService } from '../services/authotization.service';

@Scene(LOGIN_SCENE)
export class LoginScene {
  constructor(private readonly authorizationService: AuthorizationService) {
  }

  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: Context) {
    await ctx.telegram.sendMessage(ctx.chat.id, HELLO_MESSAGE, {
      reply_markup: helloKeyboard
    });
    console.log(`${ctx.from.username} entered ${LOGIN_SCENE}`);
  }

  @On('contact')
  async authorization(@Ctx() ctx: Context) {
    const user = await this.authorizationService.findOne(ctx.from.username);
    if (!user) {
      await this.authorizationService.create({
        userName: ctx.from.username,
        // @ts-ignore
        phone: ctx.message.contact.phone_number
      });
    }
    ctx.telegram.sendMessage(ctx.chat.id, AUTH_COMPLETED);
    ctx.scene.enter(TRANSACTION_SELECT_SCENE);
  }

  @On('text')
  async onText(@Ctx() ctx: Context) {
    await ctx.telegram.sendMessage(ctx.chat.id, LOGIN_SCENE_ON_MSG);
  }

  @SceneLeave()
  async onSceneLeave(@Ctx() ctx: Context) {
    console.log(`${ctx.from.username} left ${LOGIN_SCENE}`);
  }
}
