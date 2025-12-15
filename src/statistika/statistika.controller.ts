import { Controller, Get, Param, Delete } from '@nestjs/common';
import { StatisticsService } from './statistika.service';
import { UseGuards } from '@nestjs/common';
import { Roles } from "../common/decorators/roles.decorator";
import { RolesGuard } from '../common/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from '../common/constants/role';


@Controller('statistics')
@UseGuards(AuthGuard('jwt'), RolesGuard) 
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get()
  getStatistics() {
    return this.statisticsService.getStats();
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN) 
  removeStudent(@Param('id') id: number) {
    return this.statisticsService.remove(id);
  }
}
