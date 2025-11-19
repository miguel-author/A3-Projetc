import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

/**
 * Schema de Task (tarefa).
 * Conecta-se ao usuário via userId (referência).
 */
@Schema({
  collection: 'tasks',
  timestamps: true,
})
export class Task {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ trim: true })
  description: string;

  @Prop({
    required: true,
    enum: ['pendente', 'progresso', 'concluída'],
    default: 'pendente',
  })
  status: string;

  @Prop()
  expirationDate: Date;

  // Referência ao usuário dono da Task
  @Prop({ required: true })
  userId: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
