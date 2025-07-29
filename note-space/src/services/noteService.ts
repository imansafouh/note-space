// src/services/noteService.ts
import { api } from "@/lib/axios";

export type Note = {
  _id: string;
  content: string;
  createdAt: string;
  folderId?: string;
};

export async function fetchUserNotes(userId: string): Promise<Note[]> {
  const res = await api.get(`/note/user/${userId}`);
  return res.data;
}

export async function createNote(data: { content: string; folderId?: string }) {
  const res = await api.post("/note", data);
  return res.data;
}

export async function updateNote(
  id: string,
  data: { content: string; folderId?: string }
) {
  const res = await api.patch(`/note/${id}`, data);
  return res.data;
}

export async function deleteNote(id: string) {
  console.log("Deleting note with ID:", id);
  const res = await api.delete(`/note/${id}`);
  return res.data;
}
