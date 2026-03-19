import { CategoryData, CompanyBanner, CompanySlider, HomeCategoryResponse, HomeDealsResponse, HomeOfferResponse, HomeProductsResponse, Merchant, minimalMerchantData, OfferResponse, PromotionDetailsResponse, ResponseObject, StepsToAvail, SubPromotion, SubPromotionBanner, TopCashBackMerchantResponse, TopCategoryData, TopMerchantResponse,  } from '@services/dataTypes';
import apiService from '@services/ApiService';

export const apiGetPromotionalMerchants = async (company_id: string): Promise<ResponseObject<Merchant[]>> => {
	const response = await apiService.post<Merchant[]>('/company/get_header_top_promotional_merchant', {company_id});
	return response;
};

export const apiGetCompanySliders = async (company_id: string): Promise<ResponseObject<CompanySlider[]>> => {
	const response = await apiService.post<CompanySlider[]>('/company/get_sliders', {company_id});
	return response;
};

export const apiGetCompanyBanners = async (company_id: string): Promise<ResponseObject<CompanyBanner[]>> => {
	const response = await apiService.post<CompanyBanner[]>('/company/get_banners', {company_id});
	return response;
};

export const apiGetStepsToAvail = async (company_id: string): Promise<ResponseObject<StepsToAvail[]>> => {
	const response = await apiService.post<StepsToAvail[]>('/company/get_center_text', {company_id});
	return response;
};

export const apiGetPopularOffers = async (company_id: string): Promise<ResponseObject<HomeDealsResponse>> => {
	const response = await apiService.post<HomeDealsResponse>('/company/get_popular_offers', {company_id});
	return response;
};

export const apiGetPopularDeals = async (company_id: string): Promise<ResponseObject<HomeOfferResponse>> => {
	const response = await apiService.post<HomeOfferResponse>('/company/get_popular_deals', {company_id});
	return response;
};

export const apiGetTopCategories = async (company_id: string): Promise<ResponseObject<HomeCategoryResponse>> => {
	const response = await apiService.post<HomeCategoryResponse>('/company/get_top_categories', {company_id});
	return response;
};
export const apiGetTopMerchants = async (company_id: string): Promise<ResponseObject<TopMerchantResponse>> => {
	const response = await apiService.post<TopMerchantResponse>('/company/get_top_promotional_merchant', {company_id});
	return response;
};

export const apiSubscribeNewsletter = async (company_id: string, email: string): Promise<ResponseObject<Merchant[]>> => {
	const response = await apiService.post<Merchant[]>('/company/subscribe_newsletter', {company_id, email});
	return response;
};

export const apiMerchantSlug = async (company_id: string): Promise<ResponseObject<any>> => {
	const response = await apiService.get<any>('/company/get_merchant_with_slug', {company_id});
	return response;
};

export const apiCategorySlug = async (company_id: string): Promise<ResponseObject<any>> => {
	const response = await apiService.get<any>('/company/get_category_with_slug', {company_id});
	return response;
};

export const apiNavCategory = async (company_id: string): Promise<ResponseObject<CategoryData[]>> => {
	const response = await apiService.post<CategoryData[]>('/company/get_new_nav_category', {company_id});
	return response;
};

export const apiGetTrippleBannersCarousel = async (domain: string): Promise<ResponseObject<CompanyBanner[][]>> => {
	const response = await apiService.get<CompanyBanner[][]>('/company/get_triple_banners', {domain});
	return response;
};

export const apiGetPopularProducts = async (company_id: string): Promise<ResponseObject<HomeProductsResponse>> => {
	const response = await apiService.post<HomeProductsResponse>('/company/get_popular_products', {company_id});
	return response;
};

export const apiGetProductCategories = async (company_id: string, category_id?:string): Promise<ResponseObject<CategoryData[]>> => {
	const response = await apiService.post<CategoryData[]>('/company/get_parent_categories_products', {company_id, category_id});
	return response;
};

export const apiGetProductCategoryMerchant = async (company_id: string, category_id?:string): Promise<ResponseObject<Merchant[]>> => {
	const response = await apiService.post<Merchant[]>('/company/get_top_product_merchant', {company_id, category_id});
	return response;
};

export const apiGetProductSuggestedMerchant = async (company_id: string, category_id?:string): Promise<ResponseObject<Merchant[]>> => {
	const response = await apiService.post<Merchant[]>('/company/get_suggested_merchants', {company_id, category_id});
	return response;
};

export const apiGetTopCashbackMerchants = async (company_id: string): Promise<ResponseObject<TopCashBackMerchantResponse>> => {
	const response = await apiService.post<TopCashBackMerchantResponse>('/company/get_cashback_promotional_merchant', {company_id});
	return response;
};

export const apiGetPromotionOffers = async (company_id: string, slug: string): Promise<ResponseObject<PromotionDetailsResponse>> => {
	const response = await apiService.get<PromotionDetailsResponse>('/company/get_promotion_merchants_and_offers', {company_id, slug});
	return response;
};

export const apiGetSubPromotion = async (company_id: string, slug: string): Promise<ResponseObject<SubPromotion[]>> => {
	const response = await apiService.get<SubPromotion[]>('/company/get_parent_custom_category', {company_id, slug});
	return response;
};

export const apiGetPromoOfferBanners = async (company_id: string, slug: string): Promise<ResponseObject<PromotionDetailsResponse>> => {
	const response = await apiService.get<PromotionDetailsResponse>('/company/get_promotion_offer_banners', {company_id, slug});
	return response;
};

export const apiGetSubPromoBanners = async (company_id: string, slug: string): Promise<ResponseObject<SubPromotionBanner[]>> => {
	const response = await apiService.get<SubPromotionBanner[]>('/company/get_sub_promotion_banners', {company_id, slug});
	return response;
};

export const apiGetSubPromoSuggestedMerchant = async (company_id: string, slug: string): Promise<ResponseObject<minimalMerchantData[]>> => {
	const response = await apiService.get<minimalMerchantData[]>('/company/get_sub_promotion_suggested_merchants', {company_id, slug});
	return response;
};

export const apiCheckPromoIsParent = async (company_id: string, slug: string): Promise<ResponseObject<{is_parent: boolean, promotion_type: string}>> => {
	const response = await apiService.get<{is_parent: boolean, promotion_type: string}>('/company/promotion_is_parent_check', {company_id, slug});
	return response;
};
