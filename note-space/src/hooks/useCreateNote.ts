import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/services/noteService";

export function useCreateNote(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      // Invalidate the notes query so it refetches the latest list
      queryClient.invalidateQueries({ queryKey: ["notes", userId] });
    },
  });
}
