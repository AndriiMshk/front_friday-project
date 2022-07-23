import axios, { AxiosResponse } from 'axios'

export const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    // 'http://localhost:7542/2.0/'
    withCredentials: true,
})

export const loginApi = {
    login(data: LoginDataType) {
        return instance.post<LoginDataType, AxiosResponse<LoginResponseType>>('auth/login', data)
    }
}


//types
export type LoginDataType = {
    email: string
    password: string
    rememberMe: boolean
}

export type LoginResponseType={
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean;
    rememberMe: boolean;
    error?: string;
}