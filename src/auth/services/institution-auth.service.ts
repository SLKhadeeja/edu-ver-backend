import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import {
  Institution,
  InstitutionDocument,
} from 'src/instituitons/entities/institution.entity';

@Injectable()
export class InstitutionAuthService {
  constructor(
    @InjectModel(Institution.name)
    private institutionModel: Model<InstitutionDocument>,
  ) {}

  async register(
    name: string,
    email: string,
    password: string,
  ): Promise<Institution> {
    const existingInstitution = await this.institutionModel
      .findOne({ email })
      .exec();
    if (existingInstitution) {
      throw new ConflictException('Institution with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const institution = new this.institutionModel({
      name,
      email,
      password: hashedPassword,
    });
    return institution.save();
  }

  async login(email: string, password: string): Promise<string> {
    const institution = await this.institutionModel.findOne({ email }).exec();
    if (
      !institution ||
      !(await bcrypt.compare(password, institution.password))
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return jwt.sign({ id: institution._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
  }
}
