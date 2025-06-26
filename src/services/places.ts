import { api } from './api';
import { Places } from '@/app/types/places';


export const placesService = {
    async getPlaces(condominiumId: string): Promise<Places[]> {
        const { data } = await api.get<Places[]>(`/places/condominium/${condominiumId}`);
        return data;
    }
}