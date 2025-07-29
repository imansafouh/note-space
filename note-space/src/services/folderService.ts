import { api } from "@/lib/axios";

export type MyFolder = {
  _id: string;
  name: string;
  createdAt: string;
  userId: string;
};

export async function findUserFolders(userId: string) {
  const res = await api.get(`/folder?userId=${userId}`);

  return res.data;
}

export async function createFolder(data: { name: string }) {
  const res = await api.post("/folder", data);
  return res.data;
}

export async function updateFolder(id: string, data: { name: string }) {
  const res = await api.patch(`/folder/${id}`, data);
  return res.data;
}

export async function deleteFolder(id: string) {
  const res = await api.delete(`/folder/${id}`);
  return res.data;
}
