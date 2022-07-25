import axios, {AxiosResponse} from 'axios'


export const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    // 'https://neko-back.herokuapp.com/2.0'
    withCredentials: true,
})

//api
export const authApi = {
    me() {
        return instance.post<{}, AxiosResponse<ResponseType>>('auth/me')
    },
    login(data: LoginDataType) {
        return instance.post<LoginDataType, AxiosResponse<LoginResponseType>>('auth/login', data)
    },
    logout() {
        return instance.delete<LoginResponseType>('auth/me')

    }
}


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
