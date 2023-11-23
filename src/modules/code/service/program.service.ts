import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiService } from './api.service';
import { Program } from '../schema/program.schema';
import { LanguageService } from './language.service';
import { CreateProgramDto } from '../dto/createProgramDto';

@Injectable()
export class ProgramService {
    constructor(
        private apiService: ApiService,
        private languageService: LanguageService,
        @InjectModel(Program.name) private programModel: Model<Program>
    ) { }

    async createSubmission(bodyDto: CreateProgramDto): Promise<Program> {
        const { code, input, language_id } = bodyDto;
        const newProgram = new this.programModel({
            code: code,
            input: input,
            language_id: language_id
        });
        const submission = await this.apiService.createSubmission(language_id, code, input);
        const token = submission.token;
        const uuid = token.split('-')[0];

        newProgram.token = token;
        newProgram.uuid = uuid;
        newProgram.createdAt = new Date();

        return newProgram.save();
    }

    async getSubmission(uuid: string): Promise<Program> {
        const program = await this.programModel.findOne({ uuid: uuid }).exec();
        const submission = await this.apiService.getSubmission(program.token);

        return submission;
    }
}
