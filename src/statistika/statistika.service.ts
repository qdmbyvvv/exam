import {
  Body,
  ForbiddenException,
  Injectable,
  NotFoundException,
  Param,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Between } from "typeorm";
import { Student } from "../students/entities/student.entity";
import { UserRole } from "src/common/constants/role";

@Injectable()
export class StatisticsService {
  StudentsService: any;
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

async remove(id: string, userRole: UserRole) {

if (userRole !== UserRole.ADMIN && userRole !== UserRole.SUPER_ADMIN) {
  throw new ForbiddenException("Sizda ruxsat yo'q");
}
  const student = await this.studentRepo.findOneBy({ id: +id }); // string -> number

  if (!student) {
    throw new NotFoundException("Student topilmadi");
  }

  // Soft delete
  student.isActive = false;
  student.deletedAt = new Date();

  return this.studentRepo.save(student);
}}
