import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegramBotModule } from './telegram-bot/telegram-bot.module';

@Module({
  imports: [TelegramBotModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
