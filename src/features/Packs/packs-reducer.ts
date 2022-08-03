import { ThunkType } from '../../app/store';
import { setAppStatusAC } from '../../app/app-reducer';
import axios from 'axios';
import { commonError } from '../../utils/common-error';
import { packsApi, PackType, ParamsGetRequestType } from './packsApi';

const initialState = {
  cardPacks: [],
  page: 1,
  pageCount: 10,
  cardPacksTotalCount: 0,
  minCardsCount: 0,
  maxCardsCount: 110,
  token: '',
  tokenDeathTime: 0,
  sortOrder: ''
} as InitialStateType;

export const packsReducer = (state: InitialStateType = initialState, action: PacksActionType): InitialStateType => {
  switch (action.type) {
    case 'PACKS/SET-PACKS':
      return { ...state, cardPacks: [...action.packs], cardPacksTotalCount: action.packsTotalCount };
    case 'PACKS/CREATE-PACK':
      return { ...state, cardPacks: [action.pack, ...state.cardPacks] };
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
    case 'PACKS/SET-SORT-ORDER':
      return {...state, sortOrder: action.sortOrder}
    default:
      return state;
  }
};

const setPacksAC = (packs: PackType[], packsTotalCount: number) => ({
  type: 'PACKS/SET-PACKS',
  packs,
  packsTotalCount,
} as const);
const createPackAC = (pack: PackType) => ({ type: 'PACKS/CREATE-PACK', pack } as const);
const deletePackAC = (packId: string) => ({ type: 'PACKS/DELETE-PACK', packId } as const);
const updatePackAC = (packId: string, newPackName: string) => ({
  type: 'PACKS/UPDATE-PACK',
  packId,
  newPackName,
} as const);
export const setCurrentPageAC = (page: number) => ({ type: 'PACKS/SET-CURRENT-PAGE', page } as const);
export const setCurrentPageCountAC = (pageCount: number) => ({
  type: 'PACKS/SET-CURRENT-PAGE-COUNT',
  pageCount,
} as const);
export const setSortOrderAC = (sortOrder: string) => ({
  type: 'PACKS/SET-SORT-ORDER',
  sortOrder,
} as const);

export const setPacksTC = (params: ParamsGetRequestType): ThunkType => async(dispatch) => {
  dispatch(setAppStatusAC('loading'));
  try {
    const res = await packsApi.setPacks(params);
    dispatch(setCurrentPageAC(params.page || 1));
    dispatch(setCurrentPageCountAC(params.pageCount || 10));
    dispatch(setPacksAC(res.data.cardPacks, res.data.cardPacksTotalCount));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      commonError(error, dispatch);
    }
  }
  dispatch(setAppStatusAC('succeeded'));
};
export const createPackTC = (newPackName: string): ThunkType => async(dispatch) => {
  dispatch(setAppStatusAC('loading'));
  try {
    const res = await packsApi.createPack(newPackName);
    dispatch(createPackAC(res.data.newCardsPack));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      commonError(error, dispatch);
    }
  }
  dispatch(setAppStatusAC('succeeded'));
};
export const deletePackTC = (packId: string): ThunkType => async(dispatch) => {
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
export const updatePackTC = (packId: string, newPackName: string): ThunkType =>
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

type InitialStateType = {
  cardPacks: PackType[]
  page: number
  pageCount: number
  cardPacksTotalCount: number
  minCardsCount: number,
  maxCardsCount: number
  token: string
  tokenDeathTime: number
  sortOrder: string
}

type PacksActionType =
  | ReturnType<typeof setPacksAC>
  | ReturnType<typeof createPackAC>
  | ReturnType<typeof deletePackAC>
  | ReturnType<typeof updatePackAC>
  | ReturnType<typeof setCurrentPageAC>
  | ReturnType<typeof setCurrentPageCountAC>
  | ReturnType<typeof setSortOrderAC>



