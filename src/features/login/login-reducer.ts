import { authApi, LoginDataType } from './login-api';
import { ThunkType } from '../../app/store';
import { setAppStatusAC } from '../../app/app-reducer';
import { AxiosError } from 'axios';
import { commonError } from '../../utils/common-error';
import { setProfileAC } from '../profile/profile-reducer';

const initialState = {
  isLoggedIn: false,
};

export const loginReducer = (
  state: InitialStateType = initialState, action: LoginActionType): InitialStateType => {
  switch (action.type) {
    case 'LOGIN/SET-IS-LOGGED-IN':
      return { ...state, isLoggedIn: action.value };
    default:
      return state;
  }
};

//actions
export const setIsLoggedInAC = (value: boolean) => ({ type: 'LOGIN/SET-IS-LOGGED-IN', value } as const);

//thunks
export const loginTC = (data: LoginDataType): ThunkType => (dispatch) => {
  dispatch(setAppStatusAC('loading'));
  authApi.login(data)
    .then((res) => {
      console.log(res);
      dispatch(setIsLoggedInAC(true));
      dispatch(setProfileAC(res.data));
    })
    .catch((error: AxiosError<{ error: string }>) => {
      commonError(error, dispatch);
    })
    .finally(() => {
      dispatch(setAppStatusAC('succeeded'));
    });
};

export const logoutTC = (): ThunkType => (dispatch) => {
  dispatch(setAppStatusAC('loading'));
  authApi.logout()
    .then((res) => {
      dispatch(setIsLoggedInAC(false));
      dispatch(setProfileAC(null));
    })
    .catch((error: AxiosError<{ error: string }>) => {
      commonError(error, dispatch);
    })
    .finally(() => {
      dispatch(setAppStatusAC('succeeded'));
    });
};

//types

export type LoginActionType =
  | SetIsLoggedInActionType

export type SetIsLoggedInActionType = ReturnType<typeof setIsLoggedInAC>

export type InitialStateType = typeof initialState
