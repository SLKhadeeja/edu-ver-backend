import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { StudentModule } from './students/student.module';
import { InstitutionModule } from './instituitons/institution.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,
    StudentModule,
    InstitutionModule,
  ],
})
export class AppModule {}
