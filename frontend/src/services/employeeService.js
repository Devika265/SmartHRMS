import api from "../api/axios";


export const getEmployees = async (search = "") => {
    const response = await api.get("/employees/", {
        params: { search }
    });
    return response.data;
};

export const createEmployee = async (employeeData) => {
    const response = await api.post("/employees/", employeeData);
    return response.data;
};

export const updateEmployee = async (id, employeeData) => {
    const response = await api.put(`/employees/${id}/`, employeeData);
    return response.data;
};

export const deleteEmployee = async (id) => {
    const response = await api.delete(`/employees/${id}/`);
    return response.data;
};

export const toggleEmployeeStatus = async (id, employeeData) => {
    const response = await api.patch(`/employees/${id}/`, employeeData);
    return response.data;
};