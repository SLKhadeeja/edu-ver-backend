import { TInstitutiontypes } from 'src/interfaces/institutionTypes.interface';
export class InstitutionDto {
  institutionId: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  contact: string;
  email: string;
  website: string;
  type: TInstitutiontypes;
}
