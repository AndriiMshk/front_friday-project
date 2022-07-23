import axios, { AxiosResponse } from 'axios';
import { UserType } from './profile-reducer';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
});

export const profileApi = {
  setNewUserName(user: UserType) {
    return instance.put<{ user: UserType },
      AxiosResponse<{ updatedUser: UserType, error?: string }>>('/auth/me', user);
  },
};