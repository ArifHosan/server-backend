import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProgramService } from '../service/program.service';
import { CreateProgramDto } from '../dto/createProgramDto';

@Controller('programs')
export class ProgramController {
  constructor(
    private programService: ProgramService
  ) { }

  @Post('submission')
  createSubmission(@Body() bodyDto: CreateProgramDto) {
    return this.programService.createSubmission(bodyDto)
  }

  @Get('submission/:uuid')
  getSubmission(@Param() params: any) {
    return this.programService.getSubmission(params.uuid);
  }

  @Get(':id')
  getProgram(@Param() params: any) {
    return this.programService.getProgram(params.id);
  }
}