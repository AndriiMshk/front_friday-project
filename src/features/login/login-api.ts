import { AxiosResponse } from 'axios';
import { instance } from '../../app/appApi';
import { UserType } from '../profile/profile-reducer';

//api
export const authApi = {
  me() {
    return instance.post<{}, AxiosResponse<UserType>>('auth/me');
  },
  login(data: LoginDataType) {
    return instance.post<LoginDataType, AxiosResponse<LoginResponseType>>('auth/login', data);
  },
  logout() {
    return instance.delete<LoginResponseType>('auth/me');
  },
};

//types
export type LoginDataType = {
  email: string
  password: string
  rememberMe: boolean
}

export type LoginResponseType = {
  _id: string,
  email: string,
  name: string,
  avatar?: string,
  publicCardPacksCount: number,
  created: Date,
  updated: Date,
  isAdmin: boolean,
  verified: boolean,
  rememberMe: boolean,
  error?: string,
};
