const initialState = {};

export type InitialStateType = typeof initialState

export const registrationReducer = (
  state: InitialStateType = initialState, action: RegistrationActionType): InitialStateType => {
  switch (action.type) {
    case 'SET-REGISTRATION':
      return { ...state };
    default:
      return state;
  }
};

export type RegistrationActionType =
  | SetRegistrationACType

export type SetRegistrationACType = ReturnType<typeof setRegistrationAC>

export const setRegistrationAC = () => ({ type: 'SET-REGISTRATION' } as const);
