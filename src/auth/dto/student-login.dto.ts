export class StudentLoginRequestDto {
  email: string;
  password: string;
}

export class StudentLoginResponseDto {
  id: string;
  name: string;
  email: string;
  token: string;
}
