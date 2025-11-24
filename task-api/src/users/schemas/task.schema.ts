import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TaskDocument = Task & Document;

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

  
  @Prop({ type: String, ref: 'User', required: true })
userId: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
