import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LanguageSchema } from './schema/language.schema';
import { LanguageController } from './controller/language.controller';
import { CodeService } from './service/code.service';
import { LanguageService } from './service/language.service';
import { ApiService } from './service/api.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ProgramSchema } from './schema/program.schema';
import { ProgramController } from './controller/program.controller';
import { ProgramService } from './service/program.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'Language',
                schema: LanguageSchema,
            },
            {
                name: 'Program',
                schema: ProgramSchema,
            }
        ]),
        ConfigModule,
        HttpModule
    ],
    controllers: [LanguageController, ProgramController],
    providers: [ApiService, CodeService, LanguageService, ProgramService],
})
export class CodeModule { }
