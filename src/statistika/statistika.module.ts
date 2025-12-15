import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatisticsService } from './statistika.service';
import { StatisticsController } from './statistika.controller';
import { Student } from '../students/entities/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class StatisticsModule {}
