import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ExophaseScrapper } from './sites/exophase.scraper';
import { GameDTO } from './sites/game.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from 'src/database/entities/game.entity';
import { generateSlug } from 'src/utils/slug.util';

@Injectable()
export class ScrapingService {
  constructor(
    private readonly exophase: ExophaseScrapper,
    @InjectRepository(Game) private readonly gameRepository: Repository<Game>,
  ) {}

  @Cron('0 0 */12 * * *')
  async scrapeData(): Promise<number> {
    try {
      let scrapedCount = 0;
      console.log('Starting scraping process...');
      const games: GameDTO[] = await this.exophase.scrape();
      for (const game of games) {
        const slug = generateSlug(game.title + game.platform);
        game.slug = slug;
        const latest = await this.gameRepository.findOne({
          where: { slug: slug },
          order: { createdAt: 'DESC' },
        });

        if (!latest || latest.playtimeMs !== game.playtimeMs) {
          const newGame = this.gameRepository.create({
            ...game,
            createdAt: new Date(),
          });
          scrapedCount++;
          await this.gameRepository.save(newGame);
        }
      }
      return scrapedCount;
    } catch (error: any) {
      console.error('Error during scraping:', error);
    }
  }
}
