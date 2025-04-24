import { Module } from '@nestjs/common';
import { ScrapingService } from './scraping.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ExophaseScrapper } from './sites/exophase.scraper';
import { ScrapingController } from './scraping.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from 'src/database/entities/game.entity';

@Module({
  imports: [ScheduleModule.forRoot(), TypeOrmModule.forFeature([Game])],
  providers: [ScrapingService, ExophaseScrapper],
  controllers: [ScrapingController],
})
export class ScrapingModule {}
