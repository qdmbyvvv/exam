import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Statistika {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  totalStudents: number;

  @Column()
  activeStudents: number;

  @Column()
  inactiveStudents: number;

  @Column()
  joinedToday: number;

  @Column()
  leftToday: number;

  @CreateDateColumn()
  createdAt: Date; 
}
