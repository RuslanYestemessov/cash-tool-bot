import { Ctx, Start, Update } from 'nestjs-telegraf';
import { Context } from './interfaces/context.interface';
import { LOGIN_SCENE } from './constants/scenes.constants';
import { START_COMMAND_ERROR } from './constants/messages.constants';

@Update()
export class TelegramUpdate {
  @Start()
  start(@Ctx() ctx: Context) {
    if (ctx.scene?.current?.id !== LOGIN_SCENE) {
      ctx.scene.enter(LOGIN_SCENE);
    } else {
      return START_COMMAND_ERROR;
    }
  }
}
