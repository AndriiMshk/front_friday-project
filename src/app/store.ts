import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {loginReducer} from '../features/login/login-reducer';
import {newPasswordReducer} from '../features/new-password/newPassword-reducer';
import {passwordRecoveryReducer} from '../features/password-recovery/passwordRecovery-reducer';
import {profileReducer} from '../features/profile/profile-reducer';
import {registrationReducer} from '../features/registration/registration-reducer';
import {appReducer} from './app-reducer';
import {packsReducer} from "../features/Packs/packs-reducer";
import {cardsReducer} from "../features/Cards/cards-reducer";

let rootReducer = combineReducers({
    login: loginReducer,
    newPassword: newPasswordReducer,
    passwordRecovery: passwordRecoveryReducer,
    profile: profileReducer,
    registration: registrationReducer,
    app: appReducer,


});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type RootStateType = ReturnType<typeof rootReducer>

export type DispatchType = ThunkDispatch<RootStateType, unknown, AnyAction>
export const useAppDispatch = () => useDispatch<DispatchType>();
export type ThunkType<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, AnyAction>
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;