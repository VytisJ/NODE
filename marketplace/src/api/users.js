import axios from "axios";
import { API } from "./const";

const fetchUsers = async () => {
  const response = await axios.get(`${API}/users`);
  return response.data;
};

export const registerUser = async (user) => {
  const response = await axios.post(`${API}/users`, user);
  return response.data;
};

export const loginUser = async (loggingUser) => {
  const response = await fetchUsers();
  const existingUser = (user) =>
    user.email === loggingUser.email && user.password === loggingUser.password;
  return response.find(existingUser);
};
