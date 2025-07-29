import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type FolderDocument = HydratedDocument<Folder>;

@Schema()
export class Folder {
  @Prop({ required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: mongoose.Types.ObjectId;

  @Prop({ default: Date.now() })
  createdAt: Date;
}

export const FolderSchema = SchemaFactory.createForClass(Folder);

FolderSchema.virtual('notes', {
  ref: 'Note',
  localField: '_id',
  foreignField: 'folderId',
});

FolderSchema.set('toObject', { virtuals: true });
FolderSchema.set('toJSON', { virtuals: true });
