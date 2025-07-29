import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Note, noteSchema } from './schemas/note.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Note.name, schema: noteSchema }]),
  ],
  controllers: [NoteController],
  providers: [NoteService, MongooseModule],
  exports: [MongooseModule],
})
export class NoteModule {}
