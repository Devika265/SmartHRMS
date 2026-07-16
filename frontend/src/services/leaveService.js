import api from "../api/axios";

export const getLeaves = async (search = "") => {
  const response = await api.get("/leave/", {
    params: { search },
  });
  return response.data;
};

export const createLeave = async (data) => {
  const response = await api.post("/leave/", data);
  return response.data;
};

export const updateLeave = async (id, data) => {
  const response = await api.put(`/leave/${id}/`, data);
  return response.data;
};

export const deleteLeave = async (id) => {
  const response = await api.delete(`/leave/${id}/`);
  return response.data;
};
