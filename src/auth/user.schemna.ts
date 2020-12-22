import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true })
  salt: string;
  @Prop({ required: true })
  f_name: string;
  @Prop({ required: true })
  l_name: string;
  @Prop({ required: true })
  adress: string;
  @Prop({ required: true })
  postal_code: number;
  @Prop({ required: true })
  city: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
