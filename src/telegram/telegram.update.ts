import { Ctx, Start, Update } from 'nestjs-telegraf';
import { Context } from './interfaces/context.interface';
import { HELLO_SCENE } from './constants/scenes.constants';
import { START_COMMAND_ERROR } from './constants/messages.constants';

@Update()
export class TelegramUpdate {
  @Start()
  start(@Ctx() ctx: Context) {
    if (!ctx.scene?.current?.id && ctx.scene?.current?.id !== HELLO_SCENE) {
      ctx.scene.enter(HELLO_SCENE);
    } else {
      return START_COMMAND_ERROR;
    }
  }
}
