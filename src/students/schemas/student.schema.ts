import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { TGender } from 'src/interfaces/gender.interface';

export type StudentDocument = Student &
  Document & {
    comparePassword: (password: string) => Promise<boolean>;
  };

@Schema()
export class Student {
  @Prop({ required: true, unique: true })
  studentId: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  middleName?: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  dob: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    required: true,
    enum: ['male', 'female'],
  })
  gender: TGender;

  @Prop({ type: Types.ObjectId, ref: 'Institution', required: true })
  institution: Types.ObjectId;
}

export const StudentSchema = SchemaFactory.createForClass(Student);

// Add instance method to compare passwords
StudentSchema.methods.comparePassword = async function (
  password: string,
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

// Pre-save hook to hash the password
StudentSchema.pre<StudentDocument>('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
