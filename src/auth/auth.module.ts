import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentAuthService } from './services/student-auth.service';
import {
  InstitutionAuthController,
  StudentAuthController,
} from './auth.controller';
import { Student, StudentSchema } from 'src/students/schemas/student.schema';
import {
  Institution,
  InstitutionSchema,
} from 'src/instituitons/schemas/institution.schema';
import { InstitutionAuthService } from './services/institution-auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
    MongooseModule.forFeature([
      { name: Institution.name, schema: InstitutionSchema },
    ]),
  ],
  controllers: [StudentAuthController, InstitutionAuthController],
  providers: [StudentAuthService, InstitutionAuthService],
})
export class AuthModule {}
