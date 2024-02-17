/*
https://docs.nestjs.com/providers#services
*/

import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class CfApiService {
    cfEndpoint: string;
    constructor(
        private readonly httpService: HttpService,
        private configService: ConfigService,
        ) {
            this.cfEndpoint =  this.configService.get<string>('CF_API_URL');
    }
    getContestsList() {
        return axios.get(`${this.cfEndpoint}/contest.list?gym=false`).then((response) => {
            return response.data;
        }
        ).catch((error) => {
            return error;
        });
    }
}
