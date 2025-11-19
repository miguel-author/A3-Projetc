import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

/**
 * Schema do Usuário para MongoDB via Mongoose.
 * Inclui validações básicas para nome, email e senha.
 */
@Schema({
  collection: 'users',
  timestamps: true, // cria createdAt / updatedAt automaticamente
})
export class User {
  @Prop({ required: true, trim: true })
  nome: string;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // valida email básico
  })
  email: string;

  @Prop({
    required: true,
    minlength: 6, // senha mínima recomendada
  })
  password: string;

  // IDs das tasks relacionadas
  @Prop({ type: [String], default: [] })
  tasksIds: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
