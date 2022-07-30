import axios from 'axios';
import { cardsApi, CardsType, ParamsGetRequestType } from './cardsApi';
import { ThunkType } from '../../../../../app/store';
import { setAppStatusAC } from '../../../../../app/app-reducer';
import { commonError } from '../../../../../utils/common-error';

const initialState = {} as InitialStateType;

export const cardsReducer = (state: InitialStateType = initialState, action: CardsActionType): InitialStateType => {
  switch (action.type) {
    case 'CARDS/SET-CARDS':
      return { ...state, cards: [...action.cards] };
    case 'CARDS/CREATE-CARD':
      return { ...state, cards: [...state.cards, action.card] };
    case 'CARDS/DELETE-CARD':
      return { ...state, cards: state.cards.filter(el => el._id !== action.cardId) };
    case 'CARDS/UPDATE-CARD':
      return {
        ...state, cards: state.cards.map(el => el._id === action.cardId
          ? { ...el, question: action?.question, comments: action?.question }
          : el),
      };
    case 'CARDS/SET-CURRENT-PAGE':
      return { ...state, page: action.page };
    case 'CARDS/SET-CURRENT-PAGE-COUNT':
      return { ...state, pageCount: action.pageCount };
    default:
      return state;
  }
};

const setCardsAC = (cards: CardType[]) => ({ type: 'CARDS/SET-CARDS', cards } as const);
const createCardAC = (card: CardType) => ({ type: 'CARDS/CREATE-CARD', card } as const);
const deleteCardAC = (cardId: string) => ({ type: 'CARDS/DELETE-CARD', cardId } as const);
const updateCardAC = (cardId: string, question?: string, comments?: string) =>
  ({ type: 'CARDS/UPDATE-CARD', cardId, comments, question } as const);
const setCurrentPageAC = (page: number | undefined) =>
  ({ type: 'CARDS/SET-CURRENT-PAGE', page } as const);
const setCurrentPageCountAC = (pageCount: number | undefined) =>
  ({ type: 'CARDS/SET-CURRENT-PAGE-COUNT', pageCount } as const);

export const setCardsTC = ({ ...params }: ParamsGetRequestType): ThunkType => async(dispatch) => {
  dispatch(setAppStatusAC('loading'));
  try {
    const res = await cardsApi.setCards({ ...params });
    dispatch(setCurrentPageAC(params.page));
    dispatch(setCurrentPageCountAC(params.pageCount));
    dispatch(setCardsAC(res.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      commonError(error, dispatch);
    }
  }
  dispatch(setAppStatusAC('succeeded'));
};

const createCardTC = ({ ...newCard }: CardsType, { ...params }: ParamsGetRequestType): ThunkType =>
  async(dispatch) => {
    dispatch(setAppStatusAC('loading'));
    try {
      const data = await cardsApi.createCard({ ...newCard });
      dispatch(createCardAC(data.data));
      const res = await cardsApi.setCards({ ...params });
      dispatch(setCurrentPageAC(params.page));
      dispatch(setCurrentPageCountAC(params.pageCount));
      dispatch(setCardsAC(res.data));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        commonError(error, dispatch);
      }
    }
    dispatch(setAppStatusAC('succeeded'));
  };
const deleteCardTC = (cardId: string, { ...params }: ParamsGetRequestType): ThunkType =>
  async(dispatch) => {
    dispatch(setAppStatusAC('loading'));
    try {
      await cardsApi.deleteCard(cardId);
      dispatch(deleteCardAC(cardId));
      const res = await cardsApi.setCards({ ...params });
      dispatch(setCurrentPageAC(params.page));
      dispatch(setCurrentPageCountAC(params.pageCount));
      dispatch(setCardsAC(res.data));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        commonError(error, dispatch);
      }
    }
    dispatch(setAppStatusAC('succeeded'));
  };
const updateCardTC = (
  cardId: string, question: string, comments: string, { ...params }: ParamsGetRequestType): ThunkType =>
  async(dispatch) => {
    dispatch(setAppStatusAC('loading'));
    try {
      const data = await cardsApi.updateCard(cardId, question, comments);
      dispatch(updateCardAC(cardId, question, comments));
      const res = await cardsApi.setCards({ ...params });
      dispatch(setCurrentPageAC(params.page));
      dispatch(setCurrentPageCountAC(params.pageCount));
      dispatch(setCardsAC(res.data));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        commonError(error, dispatch);
      }
    }
    dispatch(setAppStatusAC('succeeded'));
  };

export type CardType = {
  _id: string
  cardsPack_id: string
  user_id: string
  answer: string
  question: string | undefined
  grade: number
  shots: number
  comments: string | undefined
  type: string
  rating: number
  more_id: Date
  updated: Date
  __v: number
  answerImg: string
  answerVideo: string
  questionImg: string
  questionVideo: string
};

type InitialStateType = {
  cards: CardType[]
  packUserId: string
  page: number | undefined
  pageCount: number | undefined
  cardsTotalCount: number
  minGrade: number
  maxGrade: number
  token: string
  tokenDeathTime: number
}

type CardsActionType =
  | ReturnType<typeof setCardsAC>
  | ReturnType<typeof createCardAC>
  | ReturnType<typeof deleteCardAC>
  | ReturnType<typeof updateCardAC>
  | ReturnType<typeof setCurrentPageAC>
  | ReturnType<typeof setCurrentPageCountAC>
