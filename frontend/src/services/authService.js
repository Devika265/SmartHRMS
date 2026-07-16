import api from "../api/axios";

export const loginUser = async (loginData) => {
  try {
    const response = await api.post("/accounts/login/", loginData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProfile = async () => {
  const response = await api.get("/accounts/profile/");
  return response.data;
};

export const changePassword = async (data) => {
  const response = await api.post("/accounts/change-password/", data);
  return response.data;
};

export const logoutUser = async (data) => {
  const response = await api.post("/accounts/logout/", data);
  return response.data;
};
