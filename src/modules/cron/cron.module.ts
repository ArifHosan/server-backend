/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { cronService } from './service/cron.service';
import { CfApiService } from './service/cfapi.service';
import { NtfyService } from './service/ntfy.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [
        ConfigModule,
        HttpModule
    ],
    controllers: [],
    providers: [CfApiService, cronService, NtfyService],
})
export class CronModule {}
