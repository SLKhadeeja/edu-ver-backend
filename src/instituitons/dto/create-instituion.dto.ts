export class CreateInstitutionDto {
  instituitonId: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  contact: string;
  email: string;
  website: string;
  type: 'university' | 'college' | 'technical';
}
