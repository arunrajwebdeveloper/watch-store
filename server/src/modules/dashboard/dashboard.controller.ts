import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from '../auth/common/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/common/guards/jwt.guard';
import { RolesGuard } from '../auth/common/guards/roles.guard';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('statistics')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  getStatistics() {
    return this.dashboardService.getStatistics();
  }
}
