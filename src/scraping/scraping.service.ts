import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ExophaseScrapper } from './sites/exophase.scraper';
import { GameDTO } from './sites/game.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from 'src/database/entities/game.entity';

@Injectable()
export class ScrapingService {
  constructor(
    private readonly exophase: ExophaseScrapper,
    @InjectRepository(Game) private readonly gameRepository: Repository<Game>,
  ) {}

  @Cron('0 0 */12 * * *')
  async scrapeData(): Promise<void> {
    try {
      console.log('Starting scraping process...');
      const games: GameDTO[] = await this.exophase.scrape();
      for (const game of games) {
        const newGame = this.gameRepository.create(game);
        console.log('New game:', newGame);
        await this.gameRepository.save(newGame);
      }
    } catch (error: any) {
      console.error('Error during scraping:', error);
    }
  }
}
