import { Controller, Post, Body } from '@nestjs/common';
import { StudentAuthService } from './services/student-auth.service';
import { InstitutionAuthService } from './services/institution-auth.service';

@Controller('auth/student')
export class StudentAuthController {
  constructor(private readonly studentAuthService: StudentAuthService) {}

  @Post('register')
  async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('institutionId') institutionId: string,
  ) {
    return this.studentAuthService.register(
      name,
      email,
      password,
      institutionId,
    );
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return {
      token: await this.studentAuthService.login(email, password),
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
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.institutionAuthService.register(name, email, password);
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return {
      token: await this.institutionAuthService.login(email, password),
    };
  }
}
