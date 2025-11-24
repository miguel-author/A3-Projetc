import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  collection: 'users',
  timestamps: true,
})
export class User {

  @Prop({ required: true, trim: true })
  nome: string;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  })
  email: string;

  @Prop({
    required: true,
    minlength: 6,
  })
  password: string;

  // Agora armazena ObjectIds das tasks
  @Prop({ type: [String], default: [] })
  tasksIds: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
