import { Types } from 'mongoose';
import { InstitutionDto } from 'src/instituitons/dto/institution.dto';
import { TGender } from 'src/interfaces/gender.interface';

export class StudentDto {
  institution: Types.ObjectId | InstitutionDto;
  studentId: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  dob: string;
  gender: TGender;
  address: string;
  email: string;
  phone: string;
}
