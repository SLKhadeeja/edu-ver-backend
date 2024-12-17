import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as jwt from 'jsonwebtoken';
import { Student, StudentDocument } from 'src/students/schemas/student.schema';
import { CreateStudentDto } from 'src/students/dto/create-student.dto';
import { StudentDto } from 'src/students/dto/student.dto';

@Injectable()
export class StudentAuthService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
  ) {}

  async register(payload: CreateStudentDto): Promise<Student> {
    const existingStudent = await this.studentModel
      .findOne({ ...payload })
      .exec();
    if (existingStudent) {
      throw new ConflictException('Student with this email already exists');
    }

    const student = new this.studentModel({
      ...payload,
    });
    return student.save();
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ token: string; student: StudentDto }> {
    const student = await this.studentModel
      .findOne({ email })
      .populate('institution')
      .exec();

    const isPasswordValid = await student.comparePassword(password);
    if (!student || !isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = jwt.sign(
      { id: student._id, institution: student.institution },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      },
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: studentPassword, ...studentData } = student.toObject();

    return {
      student: {
        ...studentData,
        // institution: studentData.institution,
      },
      token,
    };
  }
}
