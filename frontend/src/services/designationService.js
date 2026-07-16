import api from "../api/axios";

export const getDesignations = async (search = "") => {
  const response = await api.get("/designations/", {
    params: { search },
  });
  return response.data;
};

export const createDesignation = async (data) => {
  const response = await api.post("/designations/", data);
  return response.data;
};

export const updateDesignation = async (id, data) => {
  const response = await api.put(`/designations/${id}/`, data);
  return response.data;
};

export const deleteDesignation = async (id) => {
  const response = await api.delete(`/designations/${id}/`);
  return response.data;
};
