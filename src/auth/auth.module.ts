import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentAuthService } from './services/student-auth.service';
import {
  InstitutionAuthController,
  StudentAuthController,
} from './auth.controller';
import { Student, StudentSchema } from 'src/students/entities/student.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
  ],
  controllers: [StudentAuthController, InstitutionAuthController],
  providers: [StudentAuthService],
})
export class AuthModule {}
