import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './module/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomLogger } from './common/logger/custom.logger';
import { StudentsModule } from './students/students.module';
import { StatisticsModule } from './statistika/statistika.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true}),

  TypeOrmModule.forRoot({
      type: "postgres",
      username: "postgres",
      port: 5432,
      password: String(process.env.DB_PASSWORD as string),
      database: String(process.env.DB_DATABASE as string),
      synchronize: true,
      
      autoLoadEntities: true,
      logging: ['error', "info", "warn"]
    }),
    StudentsModule,
    AuthModule,
    StatisticsModule
   ],
  controllers: [],
  providers: [
    CustomLogger
  ],
})
export class AppModule {}
