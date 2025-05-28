import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Utility } from 'src/database/entities/utilities.entity';
import { Repository } from 'typeorm';
import { UtilityDto } from './utilities.dto';

@Injectable()
export class UtilitiesService {
  constructor(
    @InjectRepository(Utility)
    private utilityRepository: Repository<Utility>,
  ) {}

  async create(data: UtilityDto): Promise<Utility> {
    return this.utilityRepository.save(data);
  }
  async findAll(): Promise<Utility[]> {
    return this.utilityRepository.find({ order: { date: 'DESC' } });
  }
}
