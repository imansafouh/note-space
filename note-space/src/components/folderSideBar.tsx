import { useQuery, useMutation } from "@tanstack/react-query";
import {
  findUserFolders,
  deleteFolder,
  //   updateFolder,
  createFolder,
  type MyFolder,
  updateFolder,
} from "@/services/folderService";
import { useAuth } from "@/contexts/authContext";
import { toast } from "sonner";
import type React from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Menu, MoreHorizontal, X } from "lucide-react";
import { useState } from "react";

interface MyProps extends React.ComponentProps<"div"> {
  selectedFolderId: string;
  onSelectFolder: (folderId: string) => void;
}

export function FolderSidebar({ selectedFolderId, onSelectFolder }: MyProps) {
  const { userId } = useAuth();
  const [folderName, setFolderName] = useState<string>("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [folderToMutate, setFolderToMutate] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { data: folders, refetch } = useQuery<MyFolder[]>({
    queryKey: ["folders", userId],
    queryFn: () => findUserFolders(userId!),
    enabled: !!userId,
  });

  const createMutation = useMutation({
    mutationFn: (folderName: string) => createFolder({ name: folderName }),
    onSuccess: () => {
      toast("Folder created");
      setFolderName(""); // Clear the input
      refetch();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteFolder(id),
    onSuccess: () => {
      toast.success("Folder deleted");
      setDeleteDialogOpen(false);
      setFolderToMutate(null);
      refetch();
    },
  });

  const editMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: { name: string } }) =>
      updateFolder(id, data),
    onSuccess: () => {
      toast.success("Folder updated");
      setEditDialogOpen(false);
      setFolderToMutate(null);
      setFolderName("");
      refetch();
    },
  });

  const handleCreateFolder = (folderName: string) => {
    createMutation.mutate(folderName);
  };

  const handleDeleteFolder = (id: string) => {
    deleteMutation.mutate(id);
  };
  const handleUpdateFolder = (id: string, name: string) => {
    editMutation.mutate({ id, data: { name } });
  };

  const openDeleteDialog = (folderId: string) => {
    setFolderToMutate(folderId);
    setDeleteDialogOpen(true);
  };

  const openEditDialog = (folderId: string) => {
    const folder = folders?.find((f) => f._id === folderId);
    if (folder) {
      setFolderName(folder.name);
    }
    setFolderToMutate(folderId);
    setEditDialogOpen(true);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden p-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="w-5 h-5 mr-2" /> Folders
        </Button>
      </div>

      {/* Sidebar */}
      <Card
        className={`fixed top-0 left-0 h-full w-64 border-r shadow-md transition-transform duration-300 md:relative md:translate-x-0 md:block ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close button on mobile */}
        <div className="flex items-center justify-between p-4 md:hidden">
          <p className="text-lg font-semibold">Folders</p>
          <Button variant="ghost" onClick={() => setMobileMenuOpen(false)}>
            <X className="w-5 h-5" />
          </Button>
        </div>
        <div className="flex flex-col p-4 ">
          <div className="flex items-center justify-between mb-4">
            <p className="text-lg font-medium">Folders</p>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant={"outline"} size="sm">
                  + New
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create new folder</DialogTitle>
                  <DialogDescription>
                    Write the folder's name below.
                  </DialogDescription>
                </DialogHeader>
                <Input
                  type="text"
                  placeholder="eg. folder 1"
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                />
                <DialogFooter className="mt-4">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button
                      onClick={() => handleCreateFolder(folderName)}
                      disabled={!folderName.trim()}
                    >
                      Create Folder
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Folders list */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center w-full">
              <Button
                variant={selectedFolderId === "" ? "secondary" : "ghost"}
                className="flex-1 justify-start"
                onClick={() => onSelectFolder("")}
              >
                All Notes
              </Button>
            </div>
            {folders?.map((folder) => (
              <div key={folder._id} className="flex items-center w-full">
                <Button
                  variant={
                    selectedFolderId === folder._id ? "secondary" : "ghost"
                  }
                  className="flex-1 justify-start truncate"
                  onClick={() => onSelectFolder(folder._id)}
                >
                  {folder.name}
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant={"ghost"} size="sm" className="ml-auto p-1">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => openEditDialog(folder._id)}
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => openDeleteDialog(folder._id)}
                      className="text-destructive focus:text-destructive"
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you absolutely sure you want to delete this folder?
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete this
              folder.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() =>
                folderToMutate && handleDeleteFolder(folderToMutate)
              }
              variant="destructive"
            >
              Delete Folder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog
        open={editDialogOpen}
        onOpenChange={(open) => {
          setEditDialogOpen(open);
          if (!open) {
            setFolderName("");
            setFolderToMutate(null);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Folder</DialogTitle>
            <DialogDescription>
              You can update your folder name here.
            </DialogDescription>
          </DialogHeader>

          <Input
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
          />

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              onClick={() =>
                folderToMutate && handleUpdateFolder(folderToMutate, folderName)
              }
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
