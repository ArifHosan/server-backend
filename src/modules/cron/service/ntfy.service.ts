/*
https://docs.nestjs.com/providers#services
*/

import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class NtfyService {
  ntfyEndpoint: string;
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.ntfyEndpoint = this.configService.get<string>('NTFY_API_URL');
  }

  sendNotification(body: string, headers: any) {
    return axios
      .post(`${this.ntfyEndpoint}`, body, { headers: headers })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  }
}
