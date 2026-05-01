import { axiosInstance } from './instance';

export const loginUser = async ({ email, password }) => {
  const response = await axiosInstance.post('/auth/login', {
    email,
    password,
  });

  return response.data;
};

export const registerUser = async ({ name, surname, email, password }) => {
  const response = await axiosInstance.post('/auth/register', {
    name,
    surname,
    email,
    password,
  });

  return response.data;
};
