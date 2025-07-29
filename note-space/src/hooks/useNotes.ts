// src/hooks/useUserNotes.ts
import { useQuery } from "@tanstack/react-query";
import { fetchUserNotes } from "@/services/noteService";

export function useUserNotes(userId: string) {
  return useQuery({
    queryKey: ["notes", userId],
    queryFn: () => fetchUserNotes(userId),
    enabled: !!userId,
  });
}
