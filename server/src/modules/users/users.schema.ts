import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { UserDetails, UserDetailsSchema } from './schemas/user-details.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ type: MongooseSchema.Types.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: ['admin', 'customer'], default: 'customer' })
  role: string;

  @Prop({ type: UserDetailsSchema })
  details?: UserDetails;
}

export const UserSchema = SchemaFactory.createForClass(User);
