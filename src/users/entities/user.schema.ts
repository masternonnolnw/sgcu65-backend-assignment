import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  email: string;

  @Prop()
  firstname: string;

  @Prop()
  surname: string;

  @Prop()
  salary: number;

  @Prop()
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
