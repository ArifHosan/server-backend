import { Controller, Get } from '@nestjs/common';
import { LanguageService } from '../service/language.service';
import { Language } from '../schema/language.schema';

@Controller('languages')
export class LanguageController {
  constructor(
    private languageService: LanguageService
  ) { }

  @Get('update')
  updateLanguge() {
    return this.languageService.updateLanguage();
  }

  @Get('')
  async getLanguages(): Promise<Language[]> {
    return this.languageService.findAll();
  }

  @Get('selected')
  async getSelectedLanguages(): Promise<Language[]> {
    return this.languageService.findByIdIn([93,71,74,62,54,49 ]);
  }

}