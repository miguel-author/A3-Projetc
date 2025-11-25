import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// UserDocument combina o schema User com os métodos do Mongoose.
// Esse tipo é usado no service e controller.
export type UserDocument = User & Document;

// Define o schema da collection "users"
// timestamps: true adiciona createdAt e updatedAt automaticamente.
@Schema({
  collection: 'users',
  timestamps: true,
})
export class User {

  @Prop({ required: true, trim: true })
  nome: string;
  // Nome do usuário — obrigatório.
  // trim remove espaços extras no início e fim.

  @Prop({
    required: true,
    unique: true,  // garante que não existam 2 usuários com o mesmo email
    lowercase: true, // converte para minúsculas antes de salvar (boa prática)
    trim: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // validação regex para formato de email
  })
  email: string;

  @Prop({
    required: true,
    minlength: 6, // força uma regra mínima de segurança para senha
  })
  password: string;

  // Armazena os IDs das tasks associadas ao usuário
  // Relacionamento manual - útil caso você queira fazer populate ou tracking manual
  @Prop({ type: [String], default: [] })
  tasksIds: string[];
}

// Gera o schema final para o Mongoose baseado na classe acima.
export const UserSchema = SchemaFactory.createForClass(User);
