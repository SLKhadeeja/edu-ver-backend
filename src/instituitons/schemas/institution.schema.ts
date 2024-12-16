import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InstitutionDocument = Institution & Document;

@Schema()
export class Institution {
  @Prop({ required: true, unique: true })
  instituitonId: string;

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
  type: string;
}

export const InstitutionSchema = SchemaFactory.createForClass(Institution);
