import {ThunkType} from '../../app/store';
import {setAppStatusAC} from '../../app/app-reducer';
import {AxiosError} from 'axios';
import {commonError} from '../../utils/common-error';
import {signupAPI} from './api';

const initState = {
    isRegistered: false
}
export const registrationReducer = (
    state: InitStateType = initState, action: ActionType
): InitStateType => {
    switch (action.type) {
        case 'SET_REG':
            return {...state, isRegistered: true}
        default:
            return state
    }
}
const setRegistered = () => ({type: 'SET_REG'} as const)

export const signupTC = (email: string, password: string): ThunkType => {
    return (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        signupAPI.signup(email, password)
            .then(() => {
                dispatch(setRegistered())
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch((error: AxiosError<{ error: string }>) => {
                commonError(error, dispatch)
            })
    }
}

export type InitStateType = typeof initState
type SetRegType = ReturnType<typeof setRegistered>
type ActionType = SetRegType