import axios from 'axios';


const initialState = {

};

export const cardsReducer = (state: InitialStateType, action: CardsActionType): any => {


  }



export type cardType = {
  _id: string
  cardsPack_id: string
  user_id: string
  answer: string
  question: string
  grade: number
  shots: number
  comments: string
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
  cards: cardType[]
  packUserId: string
  page: number
  pageCount: number
  cardsTotalCount: number
  minGrade: number
  maxGrade: number
  token: string
  tokenDeathTime: number
}

type CardsActionType = any
