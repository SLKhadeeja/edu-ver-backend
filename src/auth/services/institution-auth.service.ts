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
} from 'src/instituitons/schemas/institution.schema';
import { CreateInstitutionDto } from 'src/instituitons/dto/create-instituion.dto';
import { InstitutionDto } from 'src/instituitons/dto/institution.dto';

@Injectable()
export class InstitutionAuthService {
  constructor(
    @InjectModel(Institution.name)
    private institutionModel: Model<InstitutionDocument>,
  ) {}

  async register(payload: CreateInstitutionDto): Promise<Institution> {
    const existingInstitution = await this.institutionModel
      .findOne({ email: payload.email })
      .exec();
    if (existingInstitution) {
      throw new ConflictException('Institution with this email already exists');
    }

    const institution = new this.institutionModel({
      ...payload,
    });
    return institution.save();
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ token: string; institution: InstitutionDto }> {
    const institution = await this.institutionModel.findOne({ email }).exec();
    if (
      !institution ||
      !(await bcrypt.compare(password, institution.password))
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = jwt.sign({ id: institution._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...institutionData } = institution.toObject();

    return {
      institution: institutionData,
      token,
    };
  }
}
