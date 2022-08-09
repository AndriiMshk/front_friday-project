import { AxiosResponse } from 'axios';
import { instance } from '../../app/appApi';

export const cardsApi = {
  setCards(params: ParamsGetRequestType) {
    return instance.get<ParamsGetRequestType, AxiosResponse<any>>(`cards/card`, { params: { ...params } });
  },
  createCard(newCard: CardType) {
    return instance.post<CardType, AxiosResponse<any>>(`cards/card`, { card: { ...newCard } });
  },
  deleteCard(cardId: string) {
    return instance.delete<{ cardId: number }, AxiosResponse<any>>(`cards/card/?id=${cardId}`);
  },
  updateCard(cardId: string, question?: string, comments?: string) {
    return instance.put<{ cardId: number, question?: string, comments?: string }, AxiosResponse<any>>
    (`cards/card`, { card: { _id: cardId, question, comments } });
  },
  updateGrade(cardId: string, grade: number) {
    return instance.put('/cards/grade', {grade, card_id: cardId})
  }
};

export type CardType = {
  cardsPack_id: string
  answer?: string
  question?: string
  grade: number
  rating?: number
  shots?: number
  type?: string
  user_id?: string
  created?: Date | string
  updated?: Date | string
  __v?: number
  _id?: string
  answerImg?: string
  questionImg?: string
  questionVideo?: string
  answerVideo?: string
}

export type ParamsGetRequestType = {
  _id?: string
  cardAnswer?: string
  cardQuestion?: string
  cardsPack_id?: string
  min?: number
  max?: number
  sortCards?: string
  page?: number
  pageCount?: number
}

