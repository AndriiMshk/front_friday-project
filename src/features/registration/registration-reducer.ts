import {ThunkType} from '../../app/store';
import {setAppStatusAC} from '../../app/app-reducer';
import {commonError} from '../../utils/common-error';
import {signupAPI} from './api';

const initState = null

export const registrationReducer = (
    state: InitStateType = initState, action: any
): InitStateType => {
    switch (action.type) {
        default:
            return state
    }
}

export const signupTC = (email: string, password: string): ThunkType => {
    return async (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        try {
            const data = await signupAPI.signup(email, password)
            dispatch(setAppStatusAC('succeeded'))
            return data
        } catch (e) {
            commonError(e, dispatch)
        }
    }
}

export type InitStateType = typeof initState
