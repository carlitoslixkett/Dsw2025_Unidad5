import { instance } from "../../shared/api/axiosInstance";

export const login = async (username, password) => {
  try {
    const response = await instance.post("/api/Auth/login", {
      username: username,
      password: password,
    });

    return {
      token: response.data.token,
      user: response.data.user,
      error: null,
    };

  } catch (error) {
    return {
      token: null,
      user: null,
      error: error.response?.data || error,
    };
  }
};
