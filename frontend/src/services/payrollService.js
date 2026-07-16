import api from "../api/axios";

export const getPayrolls = async (search = "") => {
  const response = await api.get("/payroll/", {
    params: { search },
  });
  return response.data;
};

export const createPayroll = async (data) => {
  const response = await api.post("/payroll/", data);
  return response.data;
};

export const updatePayroll = async (id, data) => {
  const response = await api.put(`/payroll/${id}/`, data);
  return response.data;
};

export const deletePayroll = async (id) => {
  const response = await api.delete(`/payroll/${id}/`);
  return response.data;
};
