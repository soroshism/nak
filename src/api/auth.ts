import api from "./axios";

export const login = async (userName: string, password: string) => {
  const res = await api.post("/auth/login", { userName, password });
  return res.data;
};

export const registerUser = async (
  firstName: string,
  lastName: string,
  userName: string,
  password: string
) => {
  const res = await api.post("/users/register", {
    firstName,
    lastName,
    userName,
    password,
  });
  return res.data;
};
