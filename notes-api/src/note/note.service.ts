import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Note } from './schemas/note.schema';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class NoteService {
  constructor(@InjectModel(Note.name) private noteModel: Model<Note>) {}

  create(createNoteDto: CreateNoteDto, userId: string) {
    return this.noteModel.create({
      ...createNoteDto,
      userId: userId,
    });
  }

  findAll(userId?: string) {
    if (userId) {
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        // return an empty array or throw a 400 Bad Request, your call
        return [];
      }

      return this.noteModel
        .find({ userId })
        .populate('userId', 'email username');
    }

    return this.noteModel.find().populate('userId', 'email username');
  }

  findOne(id: number) {
    return this.noteModel.findById(id).populate('userId', 'email username');
  }

  findByUser(userId: string) {
    const notes = this.noteModel.find({ userId });

    return notes;
  }

  update(id: string, updateNoteDto: UpdateNoteDto) {
    return this.noteModel
      .findByIdAndUpdate(id, updateNoteDto, { new: true })
      .populate('userId', 'email username');
  }

  remove(id: string) {
    return this.noteModel.findByIdAndDelete(id);
  }
}
