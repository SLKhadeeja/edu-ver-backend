import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TInstitutiontypes } from 'src/interfaces/institutionTypes.interface';
import * as bcrypt from 'bcryptjs';

export type InstitutionDocument = Institution &
  Document & {
    comparePassword: (password: string) => Promise<boolean>;
  };

@Schema()
export class Institution {
  @Prop({ required: true, unique: true })
  institutionId: string;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  contact: string;

  @Prop({ required: true })
  website: string;

  @Prop({
    required: true,
    enum: ['university', 'college', 'technical'],
  })
  type: TInstitutiontypes;
}

export const InstitutionSchema = SchemaFactory.createForClass(Institution);

// Add instance method to compare passwords
InstitutionSchema.methods.comparePassword = async function (
  password: string,
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

// Pre-save hook to hash the password
InstitutionSchema.pre<InstitutionDocument>('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
