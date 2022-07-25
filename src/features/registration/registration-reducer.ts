import {ThunkType} from '../../app/store';
import {setAppStatusAC} from '../../app/app-reducer';
import {AxiosError} from 'axios';
import {commonError} from '../../utils/common-error';
import {signupAPI} from './api';

const initState = {};
export const registrationReducer = (state: InitStateType = initState): InitStateType => {
    return state;
};

export const signupTC = (email: string, password: string): ThunkType => {
    return (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        signupAPI.signup(email, password)
            .then(res => {
                console.log(res)
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch((error: AxiosError<{ error: string }>) => {
                commonError(error, dispatch)
            })
    }
}

export type InitStateType = typeof initState