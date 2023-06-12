import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MockController } from './controller/mock.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, MockController],
  providers: [AppService],
})
export class AppModule {}
