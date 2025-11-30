import { instance } from "../../shared/api/axiosInstance";


export const register = async (data) => {
  try {
    const response = await instance.post("/api/Auth/register", {
      username: data.username,
      password: data.password,
      email: data.email,
      phoneNumber: data.phoneNumber
    });

    return { user: response.data, error: null };

  } catch (error) {
    return {
      user: null,
      error: error.response?.data || error,
    };
  }
};
