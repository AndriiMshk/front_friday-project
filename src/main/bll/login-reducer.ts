const initialState = {};

export type InitialStateType = typeof initialState

export const loginReducer = (
  state: InitialStateType = initialState, action: LoginActionType): InitialStateType => {
  switch (action.type) {
    case 'SET-LOGIN':
      return { ...state };
    default:
      return state;
  }
};

export type LoginActionType =
  | SetLoginACType

export type SetLoginACType = ReturnType<typeof setLoginAC>

export const setLoginAC = () => ({ type: 'SET-LOGIN' } as const);