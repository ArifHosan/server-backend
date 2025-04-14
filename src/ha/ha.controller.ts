import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Controller, Get, Inject, Param } from '@nestjs/common';
import axios from 'axios';
import { Agent } from 'https';

@Controller('ha')
export class HaController {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  @Get('aseag/route/:routeId')
  getBusInfo(@Param() params: { routeId: string }): Promise<any> {
    const routeId: string = params.routeId;
    const ASEAG_ENDPOINT =
      'http://mova.aseag.de/mbroker/rest/areainformation/publicTransport/sourceSystem/' +
      routeId;
    const cacheKey = 'aseag_route_' + routeId;
    return this.cacheManager.get(cacheKey).then(async (cachedData: string) => {
      if (cachedData) {
        return JSON.parse(cachedData) as Record<string, any>;
      } else {
        const httpsAgent = new Agent({ rejectUnauthorized: false });
        const response = await axios.get(ASEAG_ENDPOINT, { httpsAgent });
        const data = response.data;

        await this.cacheManager.set(
          cacheKey,
          JSON.stringify(data),
          1000 * 60 * 10,
        );
        return data as Record<string, any>;
      }
    });
  }
}
