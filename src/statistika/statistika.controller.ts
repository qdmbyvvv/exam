import { Controller, Get, Param, Delete, ForbiddenException, Body } from '@nestjs/common';
import { StatisticsService } from './statistika.service';



@Controller('statistics')
export class StatisticsController {
  StudentsService: any;
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get()
  getStatistics() {
    return this.statisticsService.getStats();
  }


}
