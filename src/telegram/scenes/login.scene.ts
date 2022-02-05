import { Ctx, On, Scene, SceneEnter, SceneLeave } from 'nestjs-telegraf';
import { LOGIN_SCENE, TRANSACTION_SELECT_SCENE } from '../constants/scenes.constants';
import { Context } from '../interfaces/context.interface';
import { helloKeyboard } from '../keyboards/hello.keyboard';
import { AUTH_COMPLETED, HELLO_MESSAGE, LOGIN_SCENE_ON_MSG } from '../constants/messages.constants';
import { AuthorizationService } from '../services/authotization.service';
import { TelegramStateService } from '../services/telegram-state.service';

@Scene(LOGIN_SCENE)
export class LoginScene {
  constructor(
    private readonly authorizationService: AuthorizationService,
    private telegramStateService: TelegramStateService
  ) {
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
    let currentUser = await this.authorizationService.findOne(ctx.from.username);
    const userName = ctx.from.username;
    // @ts-ignore
    const phone = ctx.message.contact.phone_number;
    if (!currentUser) {
      currentUser = await this.authorizationService.create({ userName, phone });
    }
    this.telegramStateService.setCurrentUser(currentUser.id);
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
