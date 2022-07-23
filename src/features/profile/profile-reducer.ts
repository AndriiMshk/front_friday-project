import { profileApi } from './profile-api';
import { ThunkTypes } from '../../app/store';
import axios from 'axios';

export type UserType = {
  _id: string
  email: string
  name: string
  avatar?: string
  publicCardPacksCount: number
  created: string
  updated: string
  isAdmin: boolean
  verified: boolean
  rememberMe: boolean
}

// заглушки на имя и почту
const initialState = {
  _id: '',
  email: 'TEST EMAIL',
  name: 'TEST NAME',
  avatar: '',
  publicCardPacksCount: 0,
  created: '',
  updated: '',
  isAdmin: false,
  verified: false,
  rememberMe: false,
};

export const profileReducer = (
  state: UserType = initialState, action: ProfileActionType): UserType => {
  switch (action.type) {
    case 'PROFILE/SET-NEW-PROFILE':
      return { ...state };
    case 'PROFILE/SET-NEW-USER-NAME':
      debugger
      return { ...state, name: action.newName };
    default:
      return state;
  }
};

export type ProfileActionType =
  | SetProfileACType
  | SetNewUserNameACType

export type SetProfileACType = ReturnType<typeof setProfileAC>
export type SetNewUserNameACType = ReturnType<typeof setNewUserNameAC>

export const setProfileAC = () => ({ type: 'PROFILE/SET-NEW-PROFILE' } as const);
export const setNewUserNameAC = (newName: string) => ({ type: 'PROFILE/SET-NEW-USER-NAME', newName } as const);

// проверить на работоспособность
export const setNewUserNameTC = (user: UserType, newName: string): ThunkTypes => async(dispatch) => {
  const newNameUser = { ...user, name: newName };
  try {
    await profileApi.setNewUserName(newNameUser);
    dispatch(setNewUserNameAC(newName));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.warn(error.message);
    }
  }
};



