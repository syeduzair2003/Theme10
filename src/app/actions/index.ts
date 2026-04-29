'use server'
import { apiRandomOfferBanners } from '@/apis/offers';
import { apiSearchResult, apiGetAllKeywords } from '@/apis/user';

export async function searchAction(query: string, companyId: string) {
    const response = await apiSearchResult(query, companyId);
    return response;
}

export async function keywordsAction(companyId: string) {
    const response = await apiGetAllKeywords(companyId);
    return response;
}

export async function randomBannersAction(companyId: string, page: number = 1) {
    const response = await apiRandomOfferBanners(companyId, page);
    return response;
}