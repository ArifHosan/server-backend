import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from '@nestjs/cache-manager';
import { HaController } from './ha/ha.controller';

@Module({
  imports: [CacheModule.register()],
  controllers: [AppController, HaController],
  providers: [AppService],
})
export class AppModule {}
