import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// Define o tipo do documento que será usado no service e controller.
// TaskDocument combina o schema Task + métodos do Mongoose.
export type TaskDocument = Task & Document;

// Define o schema da collection "tasks"
// timestamps: true → adiciona automaticamente createdAt e updatedAt
@Schema({
  collection: 'tasks',
  timestamps: true,
})
export class Task {

  @Prop({ required: true, trim: true })
  title: string;
  // Campo obrigatório.
  // trim: remove espaços antes/depois ao salvar.

  @Prop({ trim: true })
  description: string;
  // Opcional — descrição não é obrigatória.

  @Prop({
    required: true,
    enum: ['pendente', 'progresso', 'concluída'],
    default: 'pendente',
  })
  status: string;
  // Status da tarefa.
  // Aceita apenas valores definidos no enum (boa prática para consistência).

  @Prop()
  expirationDate: Date;
  // Campo opcional.
  // Se presente, define uma data limite para completar a tarefa.

  @Prop({ type: String, ref: 'User', required: true })
  userId: string;
  // ID do usuário dono da tarefa.
  // ref: 'User' → permite relações (populate) entre Task e User no Mongoose.
}

// Cria o schema do Mongoose baseado na classe acima.
export const TaskSchema = SchemaFactory.createForClass(Task);
