import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LanguageSchema } from './schema/language.schema';
import { CodeController } from './controller/code.controller';
import { CodeService } from './service/code.service';
import { LanguageService } from './service/language.service';
import { ApiService } from './service/api.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'Language',
                schema: LanguageSchema,
            }
        ]),
        ConfigModule,
        HttpModule
    ],
    controllers: [CodeController],
    providers: [ApiService, CodeService, LanguageService],
})
export class CodeModule { }
