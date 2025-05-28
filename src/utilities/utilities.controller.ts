import { Body, Controller, Get, Post } from '@nestjs/common';
import { UtilitiesService } from './utilities.service';
import { UtilityDto } from './utilities.dto';
import { Utility } from 'src/database/entities/utilities.entity';

@Controller('utilities')
export class UtilitiesController {
  constructor(private readonly utilitiesService: UtilitiesService) {}

  @Post()
  create(@Body() body: UtilityDto) {
    const utility = new Utility();
    utility.type = body.type;
    utility.unit = body.unit;
    utility.date = new Date(body.date).toISOString().split('T')[0]; // Ensures only YYYY-MM-DD
    return this.utilitiesService.create(utility);
  }
  @Get()
  async getAll(): Promise<Utility[]> {
    const utilities = await this.utilitiesService.findAll();
    return utilities;
  }
}
