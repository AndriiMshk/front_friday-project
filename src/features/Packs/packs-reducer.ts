import {packsAPI, PackType} from "./packs-api";
import {ThunkType} from "../../app/store";
import {setAppStatusAC} from "../../app/app-reducer";
import {AxiosError} from "axios";
import {commonError} from "../../utils/common-error";

const initialState = {
    cardPacks: [] as PackType[],
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 110,
    params: {
        page: 1,
        pageCount: 10,
        min: 0,
        max: 110,
        packName: '',
        sortPacks: '',
    },
    isMyPack: false
}


export const packsReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case
        'packs/SET-PACKS':
            return {...state, cardPacks: action.packs}
        default:
            return state
    }
}

//actions
export const getPacksAC = (packs: PackType[]) => ({type: 'packs/SET-PACKS', packs} as const)

//thunks

export const getPacksTC = (): ThunkType => (dispatch, getState) => {
 /*   const {isMyPack, params} = getState().packs
    const userId = getState().profile._id*/
    dispatch(setAppStatusAC('loading'))
    packsAPI.getPacks()
        .then((res)=>{
            dispatch(getPacksAC(res.data.cardPacks))
        })
        .catch((error: AxiosError<{ error: string }>) => {
            commonError(error, dispatch)
        })
        .finally(() => {
            dispatch(setAppStatusAC('succeeded'))
        })
}

//types
type InitialStateType = typeof initialState
type ActionType = ReturnType<typeof getPacksAC>