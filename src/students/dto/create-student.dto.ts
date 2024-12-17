import { StudentDto } from './student.dto';

export class CreateStudentDto extends StudentDto {
  password: string;
}
