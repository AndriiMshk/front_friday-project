import { instance } from '../../../../app/appApi';
import { AxiosResponse } from 'axios';
import { PackType } from './packs-reducer';

export const packsApi = {
  setPacks(params: ParamsGetRequestType) {
    return instance.get<ParamsGetRequestType, AxiosResponse<GetRequestType>>(`cards/pack`, {
      params: { ...params },
    });
  },
  createPack(newPackName: string) {
    return instance.post<{ cardsPack: { name?: string, deckCover?: string, private?: boolean } }, AxiosResponse<any>>
    ('cards/pack', { cardsPack: { name: newPackName } });
  },
  deletePack(packId: string) {
    return instance.delete<AxiosResponse<any>>(`cards/pack/?id=${packId}`);
  },
  updatePack(packId: string, newPackName: string) {
    return instance.put<{ cardsPack: { _id: string, name: string } }, AxiosResponse<any>>
    (`/cards/pack`, { cardsPack: { _id: packId, name: newPackName } });
  },
};

export type ParamsGetRequestType = {
  packName?: string
  min?: number
  max?: number
  sortPacks?: string
  page?: number
  pageCount?: number
  user_id?: string
}

type GetRequestType = {
  cardPacks: PackType[]
  page: number
  pageCount: number
  cardPacksTotalCount: number
  minCardsCount: number
  maxCardsCount: number
  token: string
  tokenDeathTime: number
}