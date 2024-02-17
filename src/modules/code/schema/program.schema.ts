import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProgramDocument = HydratedDocument<Program>;

@Schema()
export class Program {
    @Prop()
    languageId: number;

    @Prop()
    uuid: string;

    @Prop()
    token: string;

    @Prop()
    code: string;

    @Prop()
    input: string;

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;
}

export const ProgramSchema = SchemaFactory.createForClass(Program);