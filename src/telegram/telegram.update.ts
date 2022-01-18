import { Ctx, Start, Update } from 'nestjs-telegraf';
import { Context } from './interfaces/context.interface';
import { HELLO_SCENE } from './telegram.constants';

@Update()
export class TelegramUpdate {
  @Start()
  start(@Ctx() ctx: Context) {
    ctx.scene.enter(HELLO_SCENE);
  }
}
