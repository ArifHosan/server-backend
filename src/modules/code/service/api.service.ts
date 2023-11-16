import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class ApiService {
    constructor(
        private readonly httpService: HttpService,
        private configService: ConfigService,
    ) { }

    fetchLanguages() {
        const url = this.configService.get<string>('JUDGE0_API_URL') + '/languages';
        const headersRequest = {
            headers: {
                'X-RapidAPI-Key': this.configService.get<string>('X_RAPIDAPI_KEY'),
                'X-RapidAPI-Host': this.configService.get<string>('X_RAPIDAPI_HOST')
            }
        }
        return axios.get(url, headersRequest).then((response) => {
            return response.data;
        }).catch((error) => {
            return error;
        })
    }
}
