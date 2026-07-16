import api from "../api/axios";

export const getAttendances = async (search = "") => {
  const response = await api.get("/attendance/", {
    params: { search },
  });
  return response.data;
};

export const createAttendance = async (data) => {
  const response = await api.post("/attendance/", data);
  return response.data;
};

export const updateAttendance = async (id, data) => {
  const response = await api.put(`/attendance/${id}/`, data);
  return response.data;
};

export const deleteAttendance = async (id) => {
  const response = await api.delete(`/attendance/${id}/`);
  return response.data;
};
