import { ResponseObject, Merchant, CompanyWiseResponse, CompanyWiseMerchant, MerchantResponse } from '@services/dataTypes';
import apiService from '@services/ApiService';

interface MerchantDetailsByCategory {
	offers: CompanyWiseResponse[],
	merchants: CompanyWiseMerchant[],
	total_offers: number
}

export const apiMerchantDetailsByCategory = async (category_id: string, company_id: string): Promise<ResponseObject<MerchantDetailsByCategory>> => {
    const response = await apiService.post<MerchantDetailsByCategory>('/company/get_offer_company_wise', {category_id, company_id});
    return response;

};

export const apiMerchantDetails = async (merchant_id: string, company_id: string): Promise<ResponseObject<Merchant>> => {
	const response = await apiService.post<Merchant>('/company/get_merchant_detail', {merchant_id, company_id});
	return response;
};

export const apiGetMerchantUniqueId = async (data: string, company_id: string): Promise<ResponseObject<Merchant>> => {
	const response = await apiService.post<Merchant>('/company/get_merchant_detail_by_type', {data, company_id});
	return response;
};

export const apiGetMerchants = async (company_id: string): Promise<ResponseObject<Merchant[]>> => {
	const response = await apiService.post<Merchant[]>('/company/get_merchants', {company_id});
	return response;
};

export const apiGetSimilarMerchants = async (company_id: string, merchant_id: string): Promise<ResponseObject<Merchant[]>> => {
	const response = await apiService.post<Merchant[]>('/company/get_similar_merchants', {company_id, merchant_id});
	return response;
};

export const apiGetNavMerchants = async (company_id: string): Promise<ResponseObject<Merchant[]>> => {
	const response = await apiService.post<Merchant[]>('/company/get_nav_menu_merchant', {company_id});
	return response;
};

export const apiGetMerchantsAlphabetically = async (company_id: string, alphabet: string, per_page?:number, page:number = 1): Promise<ResponseObject<MerchantResponse>> => {
	const response = await apiService.post<MerchantResponse>('/company/get_merchants_by_alphabet', {company_id, alphabet, per_page, page});
	return response;
};