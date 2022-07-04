const initialState = {};

export type InitialStateType = typeof initialState

export const newPasswordReducer = (
  state: InitialStateType = initialState, action: NewPasswordActionType): InitialStateType => {
  switch (action.type) {
    case 'SET-NEW-PASSWORD':
      return { ...state };
    default:
      return state;
  }
};
export type NewPasswordActionType =
  | SetNewPasswordACType

export type SetNewPasswordACType = ReturnType<typeof setNewPasswordAC>

export const setNewPasswordAC = () => ({ type: 'SET-NEW-PASSWORD' } as const);
