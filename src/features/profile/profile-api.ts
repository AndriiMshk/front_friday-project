import axios, { AxiosResponse } from 'axios';
import { UserType } from './profile-reducer';

const instance = axios.create({
  baseURL: 'http://localhost:7542/2.0/',
  // baseURL: 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
});

export const profileApi = {
  setNewUserName(name: string) {
    return instance.put<{ name: string },
      AxiosResponse<{ updatedUser: UserType, error?: string }>>('/auth/me', { name });
  },
};

/*
"email": "test031@gmail.com",
"password": "123123123123"
*/