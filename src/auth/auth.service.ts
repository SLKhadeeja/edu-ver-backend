import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as jwt from 'jsonwebtoken';
import { LoginResponseDto } from './dto/login.dto';
import { Student, StudentDocument } from 'src/students/entities/student.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
  ) {}

  async register(
    name: string,
    email: string,
    password: string,
  ): Promise<Student> {
    const student = new this.studentModel({ name, email, password });
    return student.save();
  }

  async login(email: string, password: string): Promise<LoginResponseDto> {
    const student = await this.studentModel.findOne({ email }).exec();
    if (!student || !(await student.comparePassword(password))) {
      throw new Error('Invalid credentials');
    }

    const res = {
      id: student.id,
      name: student.name,
      email: student.email,
      token: jwt.sign({ id: student._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      }),
    };
    return res;
  }
}
