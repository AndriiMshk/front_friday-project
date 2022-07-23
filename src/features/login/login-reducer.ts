import {loginApi, LoginDataType} from "./login-api";
import {ThunkType} from "../../app/store";

const initialState = {
    isLoggedIn: false
};

export type InitialStateType = typeof initialState

export const loginReducer = (
    state: InitialStateType = initialState, action: LoginActionType): InitialStateType => {
    switch (action.type) {
        case 'LOGIN/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value};
        default:
            return state;
    }
};

//actions
export const setIsLoggedInAC = (value:boolean) => ({type: 'LOGIN/SET-IS-LOGGED-IN', value} as const);


//thunks
export const loginTC=(data: LoginDataType):ThunkType=>(dispatch)=>{
loginApi.login(data)
    .then(res=>{
        dispatch(setIsLoggedInAC(true))
    })
    //complete error handling, add preloader
}


//types
export type LoginActionType =
    | SetIsLoggedInActionType

export type SetIsLoggedInActionType = ReturnType<typeof setIsLoggedInAC>

