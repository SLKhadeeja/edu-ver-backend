import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InstitutionDocument = Institution & Document;

@Schema()
export class Institution {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const InstitutionSchema = SchemaFactory.createForClass(Institution);
