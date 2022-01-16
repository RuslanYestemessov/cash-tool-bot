import { Start, Update } from 'nestjs-telegraf';

@Update()
export class TelegramUpdate {
  @Start()
  start() {
    return 'Hello!'
  }
}
