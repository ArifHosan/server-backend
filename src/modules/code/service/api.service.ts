import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class ApiService {
    headers: any;
    constructor(
        private readonly httpService: HttpService,
        private configService: ConfigService,
    ) {
        this.headers = {
            'X-RapidAPI-Key': this.configService.get<string>('X_RAPIDAPI_KEY'),
            'X-RapidAPI-Host': this.configService.get<string>('X_RAPIDAPI_HOST')
        }
    }

    fetchLanguages() {
        const url = this.configService.get<string>('JUDGE0_API_URL') + '/languages';
        const headersRequest = {
            headers: this.headers
        }
        return axios.get(url, headersRequest).then((response) => {
            return response.data;
        }).catch((error) => {
            return error;
        })
    }

    createSubmission(languageId: number, sourceCode: string, stdin: string) {
        const url = this.configService.get<string>('JUDGE0_API_URL') + '/submissions?base64_encoded=true&wait=false';
        const headersRequest = {
            headers: this.headers
        }
        const data = {
            language_id: languageId,
            source_code: sourceCode,
            stdin: stdin
        }
        return axios.post(url, data, headersRequest).then((response) => {
            return response.data;
        }).catch((error) => {
            return error;
        })
    }

    getSubmission(token: string) {
        const url = this.configService.get<string>('JUDGE0_API_URL') + '/submissions/' + token + '?base64_encoded=true';
        const headersRequest = {
            headers: this.headers
        }
        return axios.get(url, headersRequest).then((response) => {
            return response.data;
        }).catch((error) => {
            return error;
        })
    }
}
