import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Between } from "typeorm";
import { Student } from "../students/entities/student.entity";

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>
  ) {}

  // Umumiy statistika
  async getStats() {
    const total = await this.studentRepo.count();
    const active = await this.studentRepo.count({ where: { isActive: true } });
    const inactive = await this.studentRepo.count({
      where: { isActive: false },
    });

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const joinedToday = await this.studentRepo.count({
      where: {
        createdAt: Between(todayStart, todayEnd),
      },
    });

    const leftToday = await this.studentRepo.count({
      where: {
        deletedAt: Between(todayStart, todayEnd),
      },
    });

    return {
      total,
      active,
      inactive,
      joinedToday,
      leftToday,
    };
  }

  // Soft delete / remove student
 async remove(id: number) {
  const student = await this.studentRepo.findOne({ where: { id } });
  if (!student) throw new NotFoundException("Student not found");

  
  await this.studentRepo.update(id, {
    isActive: false,
    deletedAt: new Date(),
  });

  
  return this.studentRepo.findOne({ where: { id } });
}
}
