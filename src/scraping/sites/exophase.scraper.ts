import { Injectable } from '@nestjs/common';
import { SiteScraper } from './site.scrapper.interface';
import puppeteer from 'puppeteer';
import { GameDTO } from './game.dto';

@Injectable()
export class ExophaseScrapper implements SiteScraper {
  private readonly baseUrl: string = 'https://www.exophase.com/user/arifhosan';

  async scrape(): Promise<GameDTO[]> {
    try {
      const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });

      const page = await browser.newPage();
      await page.setViewport({ width: 1080, height: 1024 });
      await page.goto(this.baseUrl);

      const gameInfo = await page.evaluate(() => {
        const games: GameDTO[] = [];
        const gameElements = document.querySelectorAll(
          '.col.col-game.game-info.pe-3',
        );

        gameElements.forEach((el) => {
          const title = el.querySelector('h3 a')?.textContent?.trim(); // Extract the game title
          const link = el.querySelector('h3 a')?.getAttribute('href'); // Extract the game link
          const playtimeText = el.querySelector('.hours')?.textContent?.trim(); // Extract the playtime text

          if (title && playtimeText) {
            const timeMatch = playtimeText.match(/(\d+)h (\d+)m/);
            if (timeMatch) {
              const hours = parseInt(timeMatch[1], 10);
              const minutes = parseInt(timeMatch[2], 10);
              const playtimeMs = (hours * 60 + minutes) * 60 * 1000; // Convert to milliseconds
              games.push({ title, link, playtimeMs });
            }
          }
        });
        return games;
      });
      await browser.close();
      return gameInfo;
    } catch (error) {
      console.error('Error scraping site:', error);
      throw new Error('Error scraping site: ' + error.message);
    }
  }
}
