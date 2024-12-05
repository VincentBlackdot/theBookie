import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Book extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop()
  ISBN?: string;

  @Prop({ required: true })
  pdfUrl: string;

  @Prop()
  coverUrl?: string;

  @Prop()
  description?: string;

  @Prop({ default: 0 })
  rating: number;

  @Prop({ default: false })
  isBestSeller: boolean;

  @Prop({ default: false })
  isFeatured: boolean;

  @Prop({ default: 0 })
  downloads: number;
}

export const BookSchema = SchemaFactory.createForClass(Book);
