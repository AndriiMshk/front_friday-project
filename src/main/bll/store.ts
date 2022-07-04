import { useDispatch } from 'react-redux';
import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { LoginActionType, loginReducer } from './login-reducer';
import { NewPasswordActionType, newPasswordReducer } from './newPassword-reducer';
import { PasswordRecoveryActionType, PasswordRecoveryReducer } from './passwordRecovery-reducer';
import { ProfileActionType, profileReducer } from './profile-reducer';
import { RegistrationActionType, registrationReducer } from './registration-reducer';

let rootReducer = combineReducers({
  login: loginReducer,
  newPassword: newPasswordReducer,
  passwordRecovery: PasswordRecoveryReducer,
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