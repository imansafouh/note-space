import { EditIcon, TrashIcon } from "lucide-react";
import { Card, CardAction, CardContent, CardFooter } from "./card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { DialogFooter, DialogHeader } from "./dialog";
import { Button } from "./button";
import { useState } from "react";
import { FolderSelector } from "../folderSelector";
import { Label } from "./label";
import { ScrollArea } from "./scroll-area";

interface MyCardProps extends React.ComponentProps<"div"> {
  createdAt: Date;
  content: string;
  folderId?: string;
  onDelete?: () => void;
  onUpdate?: (newContent: string, folderId?: string) => void;
}

export function MyCard({
  className,
  content,
  createdAt,
  folderId,
  onDelete,
  onUpdate,
}: MyCardProps) {
  const [isEditOpen, setEditOpen] = useState(false);
  const [editContent, setEditContent] = useState(content);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(
    folderId || null
  );

  const handleDialogOpen = (open: boolean) => {
    if (open) {
      setEditContent(content);
      setSelectedFolderId(folderId || null);
    }
    setEditOpen(open);
  };
  return (
    <Card
      className={`bg-yellow-100 rounded-lg text-yellow-900 p-6 w-72 h-[200px] flex flex-col gap-4 hover:scale-105 transition-transform ${className}`}
    >
      <div className="flex flex-row justify-start items-center mx-2 gap-2">
        {/* <CardAction>
          <ViewIcon className="h-4 w-4" />
        </CardAction> */}
        <Dialog open={isEditOpen} onOpenChange={handleDialogOpen}>
          <DialogTrigger asChild>
            <CardAction>
              <EditIcon className="h-4 w-4" />
            </CardAction>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Note</DialogTitle>
              <DialogDescription>
                You can update your note content here.
              </DialogDescription>
            </DialogHeader>

            <textarea
              className="w-full min-h-[100px] border border-gray-300 rounded-md p-2"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
            <div className="space-y-2 truncate">
              <Label htmlFor="folder" className="text-sm font-medium">
                Folder
              </Label>
              <FolderSelector
                selectedFolderId={selectedFolderId!}
                onSelectFolder={setSelectedFolderId}
                placeholder="Choose a folder..."
              />
            </div>

            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                onClick={() => {
                  onUpdate?.(editContent, selectedFolderId!); // call parent's update
                  setEditOpen(false);
                }}
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger>
            <CardAction>
              <TrashIcon className="h-4 w-4" />
            </CardAction>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Are you absolutely sure you want to delete this note?
              </DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete this
                note.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-6">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button onClick={onDelete} variant="destructive">
                Delete Note
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <CardContent className="flex-1 overflow-hidden">
        <ScrollArea className="h-full w-full">
          <div className="whitespace-pre-wrap min-w-full">{content}</div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <time>
          {createdAt.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </time>
      </CardFooter>
    </Card>
  );
}
