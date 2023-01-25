import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type HistorySchema = HydratedDocument<History>;

@Schema({ collection: 'histories' })
export class History {
  @Prop()
  imported_at: Date;

  @Prop()
  file: string;

  @Prop()
  total_records: number;

  @Prop()
  success_records: number;

  @Prop()
  error_records: number;

  @Prop()
  error_message?: string[];
}
export const HistorySchema = SchemaFactory.createForClass(History);
