"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "./textarea";
import { useCreateNote } from "@/hooks/useCreateNote";
import { useAuth } from "@/contexts/authContext";
import { FolderSelector } from "../folderSelector";

interface CreateNoteProps {
  selectedFolderId?: string;
}

export function CreateNote({ selectedFolderId }: CreateNoteProps) {
  const [content, setContent] = useState("");
  const [selectedFolder, setSelectedFolder] = useState<string | null>(
    selectedFolderId || null
  );
  const [open, setOpen] = useState(false);
  const { userId } = useAuth();

  const { mutate, isPending } = useCreateNote(userId!);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with content:", content); // Debug log
    console.log("Selected folder:", selectedFolder); // Debug log

    if (!content.trim()) {
      console.log("No content provided");
      return;
    }

    // Include folderId in the note data
    const noteData = {
      content,
      folderId: selectedFolder || undefined, // Only include folderId if a folder is selected
    };

    mutate(noteData, {
      onSuccess: () => {
        console.log("Note created successfully"); // Debug log
        setContent(""); // Reset form
        setSelectedFolder(selectedFolderId || null); // Reset to default folder
        setOpen(false); // Close dialog
      },
      onError: (error) => {
        console.error("Error creating note:", error); // Debug log
      },
    });
  };

  // Reset form when dialog opens
  const handleDialogOpen = (isOpen: boolean) => {
    if (isOpen) {
      setContent("");
      setSelectedFolder(selectedFolderId || null); // Use the passed selectedFolderId as default
    }
    setOpen(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogOpen}>
      <DialogTrigger asChild>
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 hover:border-primary cursor-pointer transition-all p-8 min-h-[200px]">
          <div className="flex items-center justify-center w-16 h-16 text-4xl mb-2 text-gray-400">
            +
          </div>
          <p className="text-muted-foreground font-medium">New Note</p>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create new note</DialogTitle>
            <DialogDescription>
              Fill in the details below to create a new note.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-3">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your note here..."
                className="min-h-[120px]"
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="folder">Folder</Label>
              <FolderSelector
                selectedFolderId={selectedFolder!}
                onSelectFolder={setSelectedFolder}
                placeholder="Choose a folder..."
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending || !content.trim()}>
              {isPending ? "Saving..." : "Save Note"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
