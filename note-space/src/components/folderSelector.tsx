// components/FolderSelector.tsx
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import { Check, ChevronsUpDown, Folder } from "lucide-react";
import { cn } from "@/lib/utils";
import { findUserFolders, type MyFolder } from "@/services/folderService";
import { useAuth } from "@/contexts/authContext";

interface FolderSelectorProps {
  selectedFolderId?: string;
  onSelectFolder: (folderId: string | null) => void;
  placeholder?: string;
  showNoFolder?: boolean; // Option to allow "No Folder"
}

export function FolderSelector({
  selectedFolderId,
  onSelectFolder,
  placeholder = "Select folder...",
  showNoFolder = true,
}: FolderSelectorProps) {
  const [open, setOpen] = useState(false);
  const { userId } = useAuth();

  const { data: folders } = useQuery<MyFolder[]>({
    queryKey: ["folders", userId],
    queryFn: () => findUserFolders(userId!),
    enabled: !!userId,
  });

  const selectedFolder = folders?.find(
    (folder) => folder._id === selectedFolderId
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          <div className="flex items-center">
            <Folder className="mr-2 h-4 w-4" />
            {selectedFolder ? selectedFolder.name : placeholder}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search folders..." />
          <CommandEmpty>No folder found.</CommandEmpty>
          <CommandGroup>
            {showNoFolder && (
              <CommandItem
                value="no-folder"
                onSelect={() => {
                  onSelectFolder(null);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    !selectedFolderId ? "opacity-100" : "opacity-0"
                  )}
                />
                No Folder
              </CommandItem>
            )}
            {folders?.map((folder) => (
              <CommandItem
                key={folder._id}
                value={folder._id}
                className="truncate max-w-xs"
                onSelect={() => {
                  onSelectFolder(folder._id);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedFolderId === folder._id
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                <Folder className="mr-2 h-4 w-4" />
                {folder.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
