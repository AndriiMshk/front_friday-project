import { ThunkType } from '../../../../app/store';
import { setAppStatusAC } from '../../../../app/app-reducer';
import axios from 'axios';
import { commonError } from '../../../../utils/common-error';
import { packsApi, ParamsGetRequestType } from './packsApi';

const initialState = {} as InitialStateType;

export const packsReducer = (state: InitialStateType = initialState, action: PacksActionType): InitialStateType => {
  switch (action.type) {
    case 'PACKS/SET-PACKS':
      return { ...state, cardPacks: [...action.packs] };
    case 'PACKS/CREATE-PACK':
      return { ...state, cardPacks: [...state.cardPacks, action.pack] };
    case 'PACKS/DELETE-PACK':
      return { ...state, cardPacks: state.cardPacks.filter(el => el._id !== action.packId) };
    case 'PACKS/UPDATE-PACK':
      return {
        ...state, cardPacks: state.cardPacks.map(el => el._id === action.packId
          ? { ...el, name: action.newPackName }
          : el),
      };
    case 'PACKS/SET-CURRENT-PAGE':
      return { ...state, page: action?.page };
    case 'PACKS/SET-CURRENT-PAGE-COUNT':
      return { ...state, pageCount: action?.pageCount };
    default:
      return state;
  }
};

const setPacksAC = (packs: PackType[]) => ({ type: 'PACKS/SET-PACKS', packs } as const);
const createPackAC = (pack: PackType) => ({ type: 'PACKS/CREATE-PACK', pack } as const);
const deletePackAC = (packId: string) => ({ type: 'PACKS/DELETE-PACK', packId } as const);
const updatePackAC = (packId: string, newPackName: string) => ({
  type: 'PACKS/UPDATE-PACK',
  packId,
  newPackName,
} as const);
export const setCurrentPageAC = (page: number | undefined) => ({ type: 'PACKS/SET-CURRENT-PAGE', page } as const);
export const setCurrentPageCountAC = (pageCount: number | undefined) => ({
  type: 'PACKS/SET-CURRENT-PAGE-COUNT',
  pageCount,
} as const);

const setPacksTC = ({ ...params }: ParamsGetRequestType): ThunkType => async(dispatch) => {
  dispatch(setAppStatusAC('loading'));
  try {
    const res = await packsApi.setPacks({ ...params });
    dispatch(setCurrentPageAC(params?.page));
    dispatch(setCurrentPageCountAC(params?.pageCount));
    dispatch(setPacksAC(res.data.cardPacks));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      commonError(error, dispatch);
    }
  }
  dispatch(setAppStatusAC('succeeded'));
};
const createPackTC = (newPackName: string): ThunkType => async(dispatch) => {
  dispatch(setAppStatusAC('loading'));
  try {
    const res = await packsApi.createPack(newPackName);
    dispatch(createPackAC(res.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      commonError(error, dispatch);
    }
  }
  dispatch(setAppStatusAC('succeeded'));
};
const deletePackTC = (packId: string): ThunkType => async(dispatch) => {
  dispatch(setAppStatusAC('loading'));
  try {
    await packsApi.deletePack(packId);
    dispatch(deletePackAC(packId));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      commonError(error, dispatch);
    }
  }
  dispatch(setAppStatusAC('succeeded'));
};
const updatePackTC = (packId: string, newPackName: string): ThunkType =>
  async(dispatch) => {
    dispatch(setAppStatusAC('loading'));
    try {
      await packsApi.updatePack(packId, newPackName);
      dispatch(updatePackAC(packId, newPackName));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        commonError(error, dispatch);
      }
    }
    dispatch(setAppStatusAC('succeeded'));
  };

export type PackType = {
  _id: string
  user_id: string
  user_name: string
  private: boolean
  name: string
  path: string
  grade: number
  shots: number
  cardsCount: number
  type: string
  rating: number
  created: Date
  updated: Date
  more_id?: string
  __v: number
  deckCover?: any   //??????????????
};

type InitialStateType = {
  cardPacks: PackType[]
  page: number | undefined
  pageCount: number | undefined
  cardPacksTotalCount: number
  minCardsCount: number,
  maxCardsCount: number
  token: string
  tokenDeathTime: number
}

type PacksActionType =
  | ReturnType<typeof setPacksAC>
  | ReturnType<typeof createPackAC>
  | ReturnType<typeof deletePackAC>
  | ReturnType<typeof updatePackAC>
  | ReturnType<typeof setCurrentPageAC>
  | ReturnType<typeof setCurrentPageCountAC>



