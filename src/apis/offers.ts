import { ResponseObject, OfferResponse, Offer, Comments, EventMerchant } from '@services/dataTypes';
import apiService from '@services/ApiService';

export const apiSpecificOffers = async (merchant_id: string, company_id: string, page:number = 1): Promise<ResponseObject<OfferResponse>> => {
	const response = await apiService.post<OfferResponse>('/company/get_offers', {merchant_id, company_id, page});
	return response;
};
export const apiOfferBanners = async (merchant_id: string, company_id: string, page:number = 1): Promise<ResponseObject<OfferResponse>> => {
	const response = await apiService.post<OfferResponse>('/company/get_offer_banners', {merchant_id, company_id, page});
	return response;
};
export const apiBestOffers = async (company_id: string, limit?: number): Promise<ResponseObject<OfferResponse>> => {
	const response = await apiService.post<OfferResponse>('/company/get_best_offers', {company_id, limit});
	return response;
};
export const apiUpdateOfferLikes = async (company_id: string, offer_id: string, status: number): Promise<ResponseObject<any>> => {
    const response = await apiService.post<any>('/company/offer_update_like_count', {company_id, offer_id, status});
    return response;
};

export const apiAddComment = async (offer_id: string, company_id: string, comment?: string, rating?: string): Promise<ResponseObject<Comments>> => {
    const response = await apiService.post<Comments>('/company/offer_add_comment_rating', {offer_id, company_id, comment, rating});
    return response;
};

export const apiOfferDetails = async (offer_id: string, company_id: string): Promise<ResponseObject<Offer>> => {
	const response = await apiService.post<Offer>('/company/get_offer_detail', {offer_id, company_id});
	return response;
};

export const apiGetOfferComments = async (offer_id: string, company_id: string): Promise<ResponseObject<Comments[]>> => {
	const response = await apiService.post<Comments[]>('/company/get_offer_comment_rating', {offer_id, company_id});
	return response;
};
export const apiRandomOfferBanners = async (company_id: string, page?: number): Promise<ResponseObject<OfferResponse>> => {
	const response = await apiService.post<OfferResponse>('/company/random_offer_banners', {company_id, page});
	return response;
};

export const apiBestCouponOffers = async (company_id: string, limit?: number): Promise<ResponseObject<OfferResponse>> => {
	const response = await apiService.post<OfferResponse>('/company/get_best_coupon_offers', {company_id, limit});
	return response;
};

export const apiGetEventOfferBanners = async (company_id: string, slug: string): Promise<ResponseObject<OfferResponse>> => {
	const response = await apiService.get<OfferResponse>('/company/get_event_offer_banners', {company_id, slug});
	return response;
};

export const apiGetEventSuggestedMerchants = async (company_id: string, slug: string): Promise<ResponseObject<EventMerchant[]>> => {
	const response = await apiService.post<EventMerchant[]>('/company/get_event_suggested_merchants', {company_id, slug});
	return response;
};