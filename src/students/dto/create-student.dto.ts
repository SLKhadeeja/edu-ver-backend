export class CreateStudentDto {
  institutionId: string;
  studentId: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  dob: string;
  gender: 'male' | 'female';
  address: string;
  email: string;
  phone: string;
}
