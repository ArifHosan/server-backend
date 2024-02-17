import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Language } from '../schema/language.schema';
import { ApiService } from './api.service';

@Injectable()
export class LanguageService {
    constructor(
        private apiService: ApiService,
        @InjectModel(Language.name) private languageModel: Model<Language>
    ) { }

    async findAll(): Promise<Language[]> {
        return this.languageModel.find().exec();
    }

    async findByIdIn(ids: number[]): Promise<Language[]> {
        return this.languageModel.find({ id: { $in: ids } }).exec();
    }
    async findById(id: number): Promise<Language> {
        return this.languageModel.findOne({ id: id }).exec();
    }

    async updateLanguage() {
        const languages = await this.languageModel.find().exec();
        const newLanguages = await this.apiService.fetchLanguages();
        let count = 0;

        for (let i = 0; i < newLanguages.length; i++) {
            const language = newLanguages[i];
            const index = languages.findIndex((l) => l.id === language.id);
            if (index === -1) {
                count++;
                const newLanguage = new this.languageModel(language);
                await newLanguage.save();
            }
        }

        return {
            status: 'success',
            count: count,
            message: 'Languages updated'
        }
    }
}
