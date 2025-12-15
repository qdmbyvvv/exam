import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentRepo: Repository<Student>,
  ) {}

  async create(dto: CreateStudentDto) {
    const student = this.studentRepo.create(dto);
    return this.studentRepo.save(student);
  }
  async findAll() {
    return this.studentRepo.find();
  }

  async findOne(id: number) {
    const student = await this.studentRepo.findOne({ where: { id } });
    if (!student) throw new NotFoundException('Student not found');
    return student;
  }


  async update(id: number, dto: UpdateStudentDto) {
    const student = await this.findOne(id);
    Object.assign(student, dto);
    return this.studentRepo.save(student);
  }


  async remove(id: number) {
  const student = await this.findOne(id); 
  student.isActive = false;
  student.deletedAt = new Date(); 
  return this.studentRepo.save(student);
}

}
