import { profileApi } from './profile-api';
import { ThunkType } from '../../app/store';
import axios from 'axios';
import { setAppStatusAC } from '../../app/app-reducer';

export type UserType = {
  _id: string
  email: string
  name: string
  avatar?: string
  publicCardPacksCount: number
  created?: Date
  updated?: Date
  isAdmin?: boolean
  verified?: boolean
  rememberMe?: boolean
}

const initialState = {
    _id: '',
    email: '',
    name: '',
    avatar: '',
    publicCardPacksCount: 0,
    /*created: '',
    updated: '',
    isAdmin: false,
    verified: false,*/
    rememberMe: false,
};

export const profileReducer = (
    state: UserType = initialState, action: ProfileActionType): UserType => {
    switch (action.type) {
        case 'PROFILE/SET-NEW-PROFILE':
          debugger
            return {...state, ...action.user};
        case 'PROFILE/SET-NEW-USER-NAME':
            return {...state, name: action.newName};
        default:
            return state;
    }
};

export type ProfileActionType =
    | SetProfileACType
    | SetNewUserNameACType

export type SetProfileACType = ReturnType<typeof setProfileAC>
export type SetNewUserNameACType = ReturnType<typeof setNewUserNameAC>

export const setProfileAC = (user: UserType | null) => ({type: 'PROFILE/SET-NEW-PROFILE', user} as const);
export const setNewUserNameAC = (newName: string) => ({type: 'PROFILE/SET-NEW-USER-NAME', newName} as const);

export const setNewUserNameTC = (newName: string): ThunkType => async(dispatch) => {
  dispatch(setAppStatusAC('loading'));
  try {
    await profileApi.setNewUserName(newName);
    dispatch(setNewUserNameAC(newName));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.warn(error.message);
    }
  }
  dispatch(setAppStatusAC('succeeded'));
};



