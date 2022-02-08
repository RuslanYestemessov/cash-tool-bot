import { Ctx, On, Scene, SceneEnter } from 'nestjs-telegraf';
import { LOGIN_SCENE, TRANSACTION_SELECT_SCENE } from '../constants/scenes';
import { Context } from '../interfaces/context.interface';
import { helloKeyboard } from '../keyboards/hello.keyboard';
import { AUTH_COMPLETED, HELLO_MESSAGE, LOGIN_SCENE_ON_MSG } from '../constants/messages';
import { UserService } from '../services/user.service';

@Scene(LOGIN_SCENE)
export class LoginScene {
  constructor(
    private readonly userService: UserService
  ) {
  }

  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: Context) {
    await ctx.telegram.sendMessage(ctx.chat.id, HELLO_MESSAGE, {
      reply_markup: helloKeyboard
    });
  }

  @On('contact')
  async authorization(@Ctx() ctx: Context) {
    let currentUser = await this.userService.findOne(ctx.from.username);
    const userName = ctx.from.username;
    // @ts-ignore
    const phone = ctx.message.contact.phone_number;
    if (!currentUser) {
      await this.userService.create({ userName, phone });
    }
    ctx.telegram.sendMessage(ctx.chat.id, AUTH_COMPLETED);
    ctx.scene.enter(TRANSACTION_SELECT_SCENE);
  }

  @On('text')
  async onText(@Ctx() ctx: Context) {
    await ctx.telegram.sendMessage(ctx.chat.id, LOGIN_SCENE_ON_MSG);
  }
}
