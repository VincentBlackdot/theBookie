import { Schema, Document } from 'mongoose';
import { Prop, Schema as NestSchema, SchemaFactory } from '@nestjs/mongoose';

@NestSchema()
export class Book extends Document {
  @Prop()
  title: string;

  @Prop()
  author: string;

  @Prop({ required: false })
  ISBN?: string;

  @Prop()
  pdfUrl: string; // The field storing the file ID from GridFS
}

export const BookSchema = SchemaFactory.createForClass(Book);
