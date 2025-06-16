import { api } from './api';
import { Places } from '@/app/types/places';

export const placesService = {
    async getPlaces(): Promise<Places[]> {
        const { data } = await api.get<Places[]>('/places');
        return data;
    }
}