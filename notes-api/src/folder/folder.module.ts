import { Module } from '@nestjs/common';
import { FolderService } from './folder.service';
import { FolderController } from './folder.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Folder, FolderSchema } from './schemas/folder.schema';
import { NoteModule } from 'src/note/note.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Folder.name, schema: FolderSchema }]),
    NoteModule,
  ],

  controllers: [FolderController],
  providers: [FolderService, MongooseModule],
})
export class FolderModule {}
