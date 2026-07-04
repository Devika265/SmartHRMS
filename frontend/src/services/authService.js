import api from "../api/axios";

export const login = async (data) => {
    const response =await api.post("/accounts/login/", data);
    return response.data;
};