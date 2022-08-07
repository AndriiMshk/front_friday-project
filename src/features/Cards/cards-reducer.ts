import axios from 'axios';
import {cardsApi, CardType, ParamsGetRequestType} from './cardsApi';
import {ThunkType} from '../../app/store';
import {setAppStatusAC} from '../../app/app-reducer';
import {commonError} from '../../utils/common-error';

const initialState = {
    cards: [],
    packUserId: '',
    page: 1,
    pageCount: 10,
    cardsTotalCount: 0,
    cardQuestion: '',
    cardAnswer: '',
    minGrade: 0,
    maxGrade: 0,
    token: '',
    tokenDeathTime: 0,
} as InitialStateType;

export const cardsReducer = (state: InitialStateType = initialState, action: CardsActionType): InitialStateType => {
    switch (action.type) {
        case 'CARDS/SET-CARDS':
            return {
                ...state,
                cards: [...action.cards],
                cardsTotalCount: action.cardsTotalCount,
                packUserId: action.packUserId,
            };
        case 'CARDS/CREATE-CARD':
            return {...state, cards: [ action.card,...state.cards]};
        case 'CARDS/DELETE-CARD':
            return {...state, cards: state.cards.filter(el => el._id !== action.cardId)};
        case 'CARDS/UPDATE-CARD':
            return {
                ...state, cards: state.cards.map(el => el._id === action.cardId
                    ? {...el, question: action?.question, comments: action?.question}
                    : el),
            };
        case 'CARDS/SET-CURRENT-PAGE':
            return {...state, page: action.page};
        case 'CARDS/SET-CURRENT-PAGE-COUNT':
            return {...state, pageCount: action.pageCount};
        case 'CARDS/SEARCH-QUESTION':
            return {...state, cardQuestion: action.cardQuestion};
        case 'CARDS/SEARCH-ANSWER':
            return {...state, cardAnswer: action.cardAnswer};
        default:
            return state;
    }
};

const setCardsAC = (cards: CardType[], cardsTotalCount: number, packUserId: string) =>
    ({type: 'CARDS/SET-CARDS', cards, cardsTotalCount, packUserId} as const);
const createCardAC = (card: CardType) => ({type: 'CARDS/CREATE-CARD', card} as const);
const deleteCardAC = (cardId: string) => ({type: 'CARDS/DELETE-CARD', cardId} as const);
const updateCardAC = (cardId: string, question?: string, comments?: string) =>
    ({type: 'CARDS/UPDATE-CARD', cardId, comments, question} as const);
export const setCurrentPageAC = (page: number) =>
    ({type: 'CARDS/SET-CURRENT-PAGE', page} as const);
export const setCurrentPageCountAC = (pageCount: number) =>
    ({type: 'CARDS/SET-CURRENT-PAGE-COUNT', pageCount} as const);
export const searchQuestionAC = (cardQuestion: string) => ({type: 'CARDS/SEARCH-QUESTION', cardQuestion} as const)
export const searchAnswerAC = (cardAnswer: string) => ({type: 'CARDS/SEARCH-ANSWER', cardAnswer} as const)

export const setCardsTC = (params: ParamsGetRequestType): ThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading'));
    try {
        const res = await cardsApi.setCards(params);
        dispatch(setCurrentPageAC(params.page || 1));
        dispatch(setCurrentPageCountAC(params.pageCount || 10));
        dispatch(setCardsAC(res.data.cards, res.data.cardsTotalCount, res.data.packUserId));
    } catch (error) {
        if (axios.isAxiosError(error)) {
            commonError(error, dispatch);
        }
    }
    dispatch(setAppStatusAC('succeeded'));
};

export const createCardTC = (newCard: CardType): ThunkType =>
    async (dispatch) => {
        dispatch(setAppStatusAC('loading'));
        try {
            const res = await cardsApi.createCard(newCard);
            dispatch(createCardAC(res.data.newCard));
        } catch (error) {
            if (axios.isAxiosError(error)) {
                commonError(error, dispatch);
            }
        }
        dispatch(setAppStatusAC('succeeded'));
    };
export const deleteCardTC = (cardId: string): ThunkType =>
    async (dispatch) => {
        dispatch(setAppStatusAC('loading'));
        try {
            await cardsApi.deleteCard(cardId);
            dispatch(deleteCardAC(cardId));
        } catch (error) {
            if (axios.isAxiosError(error)) {
                commonError(error, dispatch);
            }
        }
        dispatch(setAppStatusAC('succeeded'));
    };
export const updateCardTC = (cardId: string, question?: string, comments?: string): ThunkType =>
    async (dispatch) => {
        dispatch(setAppStatusAC('loading'));
        try {
            await cardsApi.updateCard(cardId, question, comments);
            dispatch(updateCardAC(cardId, question, comments));
        } catch (error) {
            if (axios.isAxiosError(error)) {
                commonError(error, dispatch);
            }
        }
        dispatch(setAppStatusAC('succeeded'));
    };

type InitialStateType = {
    cards: CardType[]
    packUserId: string
    page: number
    pageCount: number
    cardsTotalCount: number
    cardQuestion:string
    cardAnswer:string
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
    | ReturnType<typeof searchQuestionAC>
    | ReturnType<typeof searchAnswerAC>
