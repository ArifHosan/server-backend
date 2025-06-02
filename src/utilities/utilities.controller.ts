/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UtilitiesService } from './utilities.service';
import { UtilityDto } from './utilities.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('utilities')
export class UtilitiesController {
  constructor(private readonly utilitiesService: UtilitiesService) {}

  @Post()
  async create(@Body() dto: UtilityDto, @Request() req) {
    return this.utilitiesService.create(dto, req.user.userId);
  }

  @Get()
  async getReadingsByMeter(
    @Request() req: any,
    @Query('meterNumber') meterNumber: string,
  ) {
    const userId = req.user.userId;
    return this.utilitiesService.findByMeter(userId, meterNumber);
  }

  @Get()
  async findAll(@Request() req) {
    return this.utilitiesService.findAllByUser(req.user.userId);
  }
  @Delete(':id')
  async delete(@Param('id') id: string, @Request() req) {
    await this.utilitiesService.delete(Number(id), req.user.userId);
    return { message: 'Deleted successfully' };
  }

  @Get('meters')
  async getUserMeters(@Request() req: any) {
    const userId = req.user.userId;
    return this.utilitiesService.findUserMeters(userId);
  }

  @Get('forecasts/:meterId')
  getForecast(@Param('meterId') meterId: number, @Request() req: any) {
    return this.utilitiesService.getForecastForMeter(meterId);
  }
}
