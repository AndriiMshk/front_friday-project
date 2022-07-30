import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const signupAPI = {
  signup(email: string, password: string) {
    return instance.post<ResponseType>('/auth/register', { email, password })
      .then(res => res.data);
  },
};

type ResponseType = {
  created: string
  email: string
  isAdmin: boolean
  name: string
  publicCardPacksCount: number
  rememberMe: boolean
  updated: string
  verified: boolean
  __v: number
  _id: string
}