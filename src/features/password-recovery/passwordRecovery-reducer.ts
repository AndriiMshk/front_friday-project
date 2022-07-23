const initialState = {};

export type InitialStateType = typeof initialState

export const PasswordRecoveryReducer = (
  state: InitialStateType = initialState, action: PasswordRecoveryActionType): InitialStateType => {
  switch (action.type) {
    case 'SET-NEW-PASSWORD':
      return { ...state };
    default:
      return state;
  }
};

export type PasswordRecoveryActionType =
  | SetNewPasswordACType

export type SetNewPasswordACType = ReturnType<typeof setNewPasswordAC>

export const setNewPasswordAC = () => ({ type: 'SET-NEW-PASSWORD' } as const);

