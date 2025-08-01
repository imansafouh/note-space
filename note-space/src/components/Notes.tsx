import { useAuth } from "@/contexts/authContext";
import { MyCard } from "./ui/myCard";
import { deleteNote, updateNote } from "@/services/noteService";
import { useUserNotes } from "@/hooks/useNotes";
import { CreateNote } from "./ui/createNote";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { FolderSidebar } from "./folderSideBar";
import { useMemo, useState } from "react";
// import { findUserFolders } from "@/services/folderService";

export function Notes() {
  const { userId } = useAuth();
  const { data: notes, refetch } = useUserNotes(userId || "");
  const [selectedFolderId, setSelectedFolderId] = useState<string>("");

  // const { data: folders, refetch: refetchFolders } = useQuery({
  //   queryKey: ["folders", userId],
  //   queryFn: () => findUserFolders(userId || ""),
  //   enabled: !!userId,
  // });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      toast.success("Note is deleted.");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: { content: string; folderId?: string };
    }) => updateNote(id, data),
    onSuccess: () => {
      toast.success("Note is updated.");
    },
    onMutate(variables) {
      if (variables.data.content.length <= 0)
        toast.error("Note cannot be empty");
    },
  });

  const handleDelete = async (id: string) => {
    deleteMutation.mutate(id);
    refetch();
  };

  const handleUpdate = (id: string, content: string, folderId?: string) => {
    updateMutation.mutate({ id, data: { content, folderId } });
    refetch();
  };

  const filteredNotes = useMemo(() => {
    if (!notes) return [];

    if (!selectedFolderId) {
      return notes;
    }

    // Show notes that belong to the selected folder
    return notes.filter((note) => note.folderId === selectedFolderId);
  }, [notes, selectedFolderId]);

  // const getFolderTitle = () => {
  //   if (!selectedFolderId) return "All Notes";
  //   // You might want to get the folder name here
  //   return "Folder Notes";
  // };

  return (
    <div className="flex max-w-8xl mx-auto my-4 px-4">
      <div className="flex-1 ml-6 w-full">
        <h1 className="text-primary text-4xl sm:text-5xl text-center font-extrabold tracking-wide mb-4 leading-tight">
          My Notes
        </h1>
        <p className="text-muted-foreground text-lg text-center mb-8">
          Here are some of my recent reflections and thoughts.
        </p>

        <div className="flex flex-row gap-6">
          <FolderSidebar
            selectedFolderId={selectedFolderId}
            onSelectFolder={setSelectedFolderId}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full items-start">
            <CreateNote selectedFolderId={selectedFolderId} />
            {filteredNotes?.map((note, index) => (
              <MyCard
                key={note._id || index}
                createdAt={new Date(note.createdAt)}
                content={note.content}
                folderId={note.folderId}
                className="w-full"
                onDelete={() => handleDelete(note._id)}
                onUpdate={(newContent, newFolderId) =>
                  handleUpdate(note._id, newContent, newFolderId)
                }
              />
            ))}
            {filteredNotes?.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground text-lg">
                  {selectedFolderId
                    ? "No notes in this folder yet."
                    : "No notes yet."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
