import {authAPI, LoginDataType} from './auth-api';
import {ThunkType} from '../../app/store';
import {setAppStatusAC} from '../../app/app-reducer';
import {AxiosError} from 'axios';
import {commonError} from '../../utils/common-error';
import {setProfileAC} from '../profile/profile-reducer';

const initialState = {
    isLoggedIn: false,
}

export const authReducer = (
    state: InitialStateType = initialState, action: LoginActionType): InitialStateType => {
    switch (action.type) {
        case 'LOGIN/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value};
        default:
            return state
    }
}

//actions
export const setIsLoggedInAC = (value: boolean) => ({type: 'LOGIN/SET-IS-LOGGED-IN', value} as const)

//thunks
export const loginTC = (data: LoginDataType): ThunkType => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then((res) => {
            dispatch(setIsLoggedInAC(true))
            dispatch(setProfileAC(res.data))
        })
        .catch((error: AxiosError<{ error: string }>) => {
            commonError(error, dispatch)
        })
        .finally(() => {
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const logoutTC = (): ThunkType => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then((res) => {
            dispatch(setIsLoggedInAC(false))
            dispatch(setProfileAC(null))
        })
        .catch((error: AxiosError<{ error: string }>) => {
            commonError(error, dispatch)
        })
        .finally(() => {
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const signupTC = (email: string, password: string): ThunkType => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const data = await authAPI.signup(email, password)
        dispatch(setAppStatusAC('succeeded'))
        return data
    } catch (e) {
        commonError(e, dispatch)
    }
}

export const sendEmail = (email: string): ThunkType => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.forgot({
            email,
            from: 'Memo Cards Team <memocards@gmail.com>',
            message: 'Test mail for password recovery'
        })
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        commonError(e, dispatch)
    }
}

export const setNewPassword = (password: string, resetPasswordToken: string): ThunkType => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.newPassword({password, resetPasswordToken});
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        commonError(e, dispatch);
    }
}

//types
export type InitialStateType = typeof initialState
export type LoginActionType = SetIsLoggedInActionType
export type SetIsLoggedInActionType = ReturnType<typeof setIsLoggedInAC>
