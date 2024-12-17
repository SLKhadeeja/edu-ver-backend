import { Controller, Post, Body } from '@nestjs/common';
import { StudentAuthService } from './services/student-auth.service';
import { InstitutionAuthService } from './services/institution-auth.service';
import { TGender } from 'src/interfaces/gender.interface';
import { TInstitutiontypes } from 'src/interfaces/institutionTypes.interface';
import { Types } from 'mongoose';

@Controller('auth/student')
export class StudentAuthController {
  constructor(private readonly studentAuthService: StudentAuthService) {}

  @Post('register')
  async register(
    @Body('institution') institution: Types.ObjectId,
    @Body('studentId') studentId: string,
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('dob') dob: string,
    @Body('gender') gender: TGender,
    @Body('address') address: string,
    @Body('email') email: string,
    @Body('phone') phone: string,
    @Body('password') password: string,
    @Body('middleName') middleName?: string,
  ) {
    return this.studentAuthService.register({
      institution,
      studentId,
      firstName,
      middleName,
      lastName,
      dob,
      password,
      gender,
      address,
      email,
      phone,
    });
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return {
      data: await this.studentAuthService.login(email, password),
    };
  }
}

@Controller('auth/institution')
export class InstitutionAuthController {
  constructor(
    private readonly institutionAuthService: InstitutionAuthService,
  ) {}

  @Post('register')
  async register(
    @Body('institutionId') institutionId: string,
    @Body('name') name: string,
    @Body('address') address: string,
    @Body('city') city: string,
    @Body('state') state: string,
    @Body('country') country: string,
    @Body('contact') contact: string,
    @Body('email') email: string,
    @Body('website') website: string,
    @Body('type') type: TInstitutiontypes,
    @Body('password') password: string,
  ) {
    return this.institutionAuthService.register({
      institutionId,
      name,
      address,
      city,
      state,
      country,
      contact,
      email,
      website,
      type,
      password,
    });
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return {
      data: await this.institutionAuthService.login(email, password),
    };
  }
}
