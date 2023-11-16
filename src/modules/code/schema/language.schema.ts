import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LanguageDocument = HydratedDocument<Language>;

@Schema()
export class Language {
  @Prop()
  name: string;

  @Prop()
  id: number;
}

export const LanguageSchema = SchemaFactory.createForClass(Language);