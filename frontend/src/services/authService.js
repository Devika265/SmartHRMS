import api from "../api/axios";

export const loginUser = async (loginData) => {
  try {
    const response = await api.post("/accounts/login/", loginData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
