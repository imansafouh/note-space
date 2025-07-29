import { ConflictException, Injectable } from '@nestjs/common';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Folder } from './schemas/folder.schema';
import { Model } from 'mongoose';
import { Note } from 'src/note/schemas/note.schema';

@Injectable()
export class FolderService {
  constructor(
    @InjectModel(Folder.name) private folderModel: Model<Folder>,
    @InjectModel(Note.name) private noteModel: Model<Note>,
  ) {}

  async create(createFolderDto: CreateFolderDto, userId: string) {
    const existingFolder = await this.folderModel.find({
      name: createFolderDto.name,
      userId,
    });

    console.log(existingFolder);

    if (existingFolder.length > 0) {
      throw new ConflictException('Folder with this name already exists');
    }

    return this.folderModel.create({
      ...createFolderDto,
      userId,
    });
  }

  findAll(userId?: string) {
    if (userId) return this.folderModel.find({ userId });

    return this.folderModel.find();
  }

  findOne(id: string) {
    return this.folderModel.findById(id).populate('notes');
  }

  update(id: string, updateFolderDto: UpdateFolderDto) {
    return this.folderModel.findByIdAndUpdate(id, updateFolderDto);
  }

  async remove(id: string) {
    await this.noteModel.updateMany(
      { folderId: id },
      { $set: { folderId: null } },
    );

    return this.folderModel.findByIdAndDelete(id);
  }
}
