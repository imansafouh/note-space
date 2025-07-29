import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  @IsEmail()
  email: string;

  @Prop({ required: true })
  passwordHashed: string;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const userSchema = SchemaFactory.createForClass(User);
