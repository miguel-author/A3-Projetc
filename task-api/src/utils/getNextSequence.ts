import { Model } from 'mongoose';
import { Counter } from '../users/schemas/counter.schema';

export async function getNextSequence(counterModel: Model<Counter>, sequenceName: string): Promise<number> {
  const counter = await counterModel.findOneAndUpdate(
    { name: sequenceName },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  return counter.seq;
}
