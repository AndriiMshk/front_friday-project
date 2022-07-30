import {cardsAPI, CardType} from "./cards-api";
import {ThunkType} from "../../app/store";
import {setAppStatusAC} from "../../app/app-reducer";
import {AxiosError} from "axios";
import {commonError} from "../../utils/common-error";

const initialState = {
    cards: [] as CardType[],
    card: {} as CardType,
    packUserId: '',
    params: {
        page: 1,
        pageCount: 10,
        cardsTotalCount: 0,
        cardQuestion: '',
        cardAnswer: '',
    },
    minGrade: 0,
    maxGrade: 6,
}

export const cardsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'cards/GET-CARDS':
            return {...state, cards: action.cards}
        default:
            return state
    }

}

//types
type InitialStateType = typeof initialState
type ActionsType = ReturnType<typeof getCardsAC>

//actions
export const getCardsAC = (cards: CardType[]) => ({type: 'cards/GET-CARDS', cards} as const)

//thunks
export const getCardsTC = (cardsPack_id: string): ThunkType => {
    return (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        cardsAPI.getCards(cardsPack_id)
            .then((res) => {
                dispatch(getCardsAC(res.data.cards))
            })
            .catch((error: AxiosError<{ error: string }>) => {
                commonError(error, dispatch)
            })
            .finally(() => {
                dispatch(setAppStatusAC('succeeded'))
            })
    }

}
