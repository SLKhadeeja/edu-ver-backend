import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../user/entities/user.entity';
import * as jwt from 'jsonwebtoken';
import { LoginResponseDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async register(name: string, email: string, password: string): Promise<User> {
    const user = new this.userModel({ name, email, password });
    return user.save();
  }

  async login(email: string, password: string): Promise<LoginResponseDto> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user || !(await user.comparePassword(password))) {
      throw new Error('Invalid credentials');
    }

    console.log(user.id);
    const res = {
      id: user.id,
      name: user.name,
      email: user.email,
      token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      }),
    };
    return res;
  }
}
