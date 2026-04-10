import api from "./api";

export const fetchTasks = async () => {
  const { data } = await api.get("/tasks");
  return data;
};

export const createTask = async (payload) => {
  const { data } = await api.post("/tasks", payload);
  return data;
};

export const updateTask = async (id, payload) => {
  const { data } = await api.put(`/tasks/${id}`, payload);
  return data;
};

export const softDeleteTask = async (id) => {
  const { data } = await api.delete(`/tasks/${id}`);
  return data;
};

export const restoreTask = async (id) => {
  const { data } = await api.put(`/tasks/restore/${id}`);
  return data;
};

export const permanentDeleteTask = async (id) => {
  const { data } = await api.delete(`/tasks/permanent/${id}`);
  return data;
};