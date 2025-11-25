import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Schema responsável por armazenar contadores automáticos no MongoDB.
// Normalmente usado para gerar IDs sequenciais (similar ao AUTO_INCREMENT em SQL).
@Schema()
export class Counter extends Document {

  @Prop({ required: true, unique: true })
  name: string; 
  // Nome do contador. Ex: "taskId", "userId".
  // O campo ser único garante que não existam dois contadores com o mesmo propósito.

  @Prop({ required: true })
  seq: number;
  // Valor atual do contador, incrementado quando um novo registro é criado.
}

// Transforma a classe em um schema pronto para ser usado com o Mongoose.
export const CounterSchema = SchemaFactory.createForClass(Counter);
