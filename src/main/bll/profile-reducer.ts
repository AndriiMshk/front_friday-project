const initialState = {};

export type InitialStateType = typeof initialState

export const profileReducer = (
  state: InitialStateType = initialState, action: ProfileActionType): InitialStateType => {
  switch (action.type) {
    case 'SET-NEW-PROFILE':
      return { ...state };
    default:
      return state;
  }
};

export type ProfileActionType =
  | SetProfileACType

export type SetProfileACType = ReturnType<typeof setProfileAC>

export const setProfileAC = () => ({ type: 'SET-NEW-PROFILE' } as const);


