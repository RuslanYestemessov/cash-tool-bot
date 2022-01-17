import { Ctx, Start, Update } from 'nestjs-telegraf';
import { HELLO_SCENE } from './telegram.constants';
import { Context } from './interfaces/context.interface';

@Update()
export class TelegramUpdate {
  @Start()
  async start(@Ctx() ctx: Context) {
    await ctx.scene.enter(HELLO_SCENE);
  }
}
