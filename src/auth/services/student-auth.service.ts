import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Student, StudentDocument } from 'src/students/entities/student.entity';

@Injectable()
export class StudentAuthService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
  ) {}

  async register(
    name: string,
    email: string,
    password: string,
    institutionId: string,
  ): Promise<Student> {
    const existingStudent = await this.studentModel.findOne({ email }).exec();
    if (existingStudent) {
      throw new ConflictException('Student with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const student = new this.studentModel({
      name,
      email,
      password: hashedPassword,
      institutionId,
    });
    return student.save();
  }

  async login(email: string, password: string): Promise<string> {
    const student = await this.studentModel.findOne({ email }).exec();
    if (!student || !(await bcrypt.compare(password, student.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return jwt.sign(
      { id: student._id, institutionId: student.institutionId },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      },
    );
  }
}
