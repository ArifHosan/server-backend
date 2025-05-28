import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilitiesService } from './utilities.service';
import { UtilitiesController } from './utilities.controller';
import { Utility } from 'src/database/entities/utilities.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Utility])],
  controllers: [UtilitiesController],
  providers: [UtilitiesService],
})
export class UtilitiesModule {}
