import {instance} from '../../app/appApi';

export const signupAPI = {
    signup(email: string, password: string) {
        return instance.post<ResponseType>('/auth/register', {email, password})
            .then(res => res.data)
    },
}

export type ResponseType = {
    addedUser?: {
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
}