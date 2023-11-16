import { Controller, Get } from '@nestjs/common';
import { LanguageService } from '../service/language.service';
import { Language } from '../schema/language.schema';

@Controller('code')
export class CodeController {
  constructor(
    private languageService: LanguageService
  ) { }

  @Get('update-language')
  updateLanguge() {
    return this.languageService.updateLanguage();
  }

  @Get('languages')
  async getLanguages(): Promise<Language[]> {
    return this.languageService.findAll();
  }

}