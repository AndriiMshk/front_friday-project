import axios from 'axios';
// import { instance } from '../login/login-api';

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
  withCredentials: true,
})

export const signupAPI = {
  signup(email: string, password: string) {
    return instance.post('/auth/register', {email, password})
        .then(res => console.log(res))
  },
}
