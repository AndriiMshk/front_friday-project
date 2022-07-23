import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { LoginActionType, loginReducer } from '../features/login/login-reducer';
import { NewPasswordActionType, newPasswordReducer } from '../features/new-password/newPassword-reducer';
import {
  PasswordRecoveryActionType,
  passwordRecoveryReducer,
} from '../features/password-recovery/passwordRecovery-reducer';
import { ProfileActionType, profileReducer } from '../features/profile/profile-reducer';
import { RegistrationActionType, registrationReducer } from '../features/registration/registration-reducer';

let rootReducer = combineReducers({
  login: loginReducer,
  newPassword: newPasswordReducer,
  passwordRecovery: passwordRecoveryReducer,
  profile: profileReducer,
  registration: registrationReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type RootStateType = ReturnType<typeof rootReducer>

export type RootActionType =
  | LoginActionType
  | NewPasswordActionType
  | PasswordRecoveryActionType
  | ProfileActionType
  | RegistrationActionType

export type DispatchType = ThunkDispatch<RootStateType, unknown, RootActionType>
export const useAppDispatch = () => useDispatch<DispatchType>();
export type ThunkTypes<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, RootActionType>
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;