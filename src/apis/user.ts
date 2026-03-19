import { ResponseObject, CompanyData, OfferResponse, CategoryData, SearchResponse, FooterResponse, MetaResponse, WidgetResponse, EventResponse, EventDetailsResponse, EventBannerResponse, DisclaimerResponse, FooterPageResponse, Template, Faqs, minimalMerchantData, ContactPageResponse, MetaKeywordsResponse, CategoryWithSub, SuggestedCategoriesResponse, CategoryOffers, Promotion, PromotionDetailsResponse, PromotionBannerResponse, EventMerchant, PromotionCategoryResponse, HomeMultiProducts, Offer, ProductData, ProductCategory, ProductCategoryData, NotFound, } from '@services/dataTypes';
import apiService from '@services/ApiService';

export const apiCategoryData = async (company_id: string): Promise<ResponseObject<CategoryData[]>> => {
	const response = await apiService.post<CategoryData[]>('/company/get_category', { company_id });
	return response;
};

export const apiSearchResult = async (query: string, company_id: string): Promise<ResponseObject<SearchResponse>> => {
	const response = await apiService.post<SearchResponse>('/company/search', { query, company_id });
	return response;
};

export const apiGetCategoryUniqueId = async (data: string, company_id: string): Promise<ResponseObject<CategoryData>> => {
	const response = await apiService.post<CategoryData>('/company/get_category_detail_by_type', { data, company_id });
	return response;
};

export const apiGetProductCategoryUniqueId = async (data: string, company_id: string): Promise<ResponseObject<ProductCategoryData>> => {
	const response = await apiService.post<ProductCategoryData>('/company/get_product_category_detail_by_type', { data, company_id });
	return response;
};

export const apiCompanyUpdatedData = async (data: { domain: string }): Promise<ResponseObject<CompanyData>> => {
	const response = await apiService.post<CompanyData>('/company/get_company_data', data);
	return response;
};

export const apiExpiredOffers = async (merchant_id: string, company_id: string): Promise<ResponseObject<OfferResponse>> => {
	const response = await apiService.post<OfferResponse>('/company/get_expired_offers', { merchant_id, company_id });
	return response;
};

export const apiGetKeywords = async (merchant_id: string, company_id: string): Promise<ResponseObject<any>> => {
	const response = await apiService.post<any>('/company/get_meta_value', { merchant_id, company_id });
	return response;
};
export const apiFooter = async (company_id: string): Promise<ResponseObject<FooterResponse[]>> => {
	const response = await apiService.post<FooterResponse[]>('/company/get_blog', { company_id });
	return response;
};

export const apiOutUrl = async (company_id: string, id: string): Promise<ResponseObject<any>> => {
	const response = await apiService.post<any>('/company/out_URL', { company_id, id });
	return response;
};

export const apiMostSearch = async (company_id: string): Promise<ResponseObject<any>> => {
	const response = await apiService.post<any>('/company/get_search_data', { company_id });
	return response;
};

export const apiGetAllKeywords = async (company_id: string): Promise<ResponseObject<any>> => {
	const response = await apiService.post<any>('/company/get_meta_keywords', { company_id });
	return response;
};

export const apiGetAllUpdatedKeywords = async (domain: string): Promise<ResponseObject<MetaKeywordsResponse[]>> => {
	const response = await apiService.get<MetaKeywordsResponse[]>('/company/get_meta_updated_keywords', { domain });
	return response;
};

export const apiSearchStore = async (query: string, company_id: string): Promise<ResponseObject<SearchResponse>> => {
	const response = await apiService.post<SearchResponse>('/company/search_store', { query, company_id });
	return response;
};

export const apiGetMetaData = async (data: string, domain: string): Promise<ResponseObject<MetaResponse>> => {
	const response = await apiService.get<MetaResponse>('/company/get_meta_details', { data, domain });
	return response;
};

export const apiGetWidgets = async (domain: string): Promise<ResponseObject<WidgetResponse>> => {
	const response = await apiService.get<WidgetResponse>('/company/get_company_widgets', { domain });
	return response;
};

export const apiGetEvents = async (company_id: string): Promise<ResponseObject<EventResponse[]>> => {
	const response = await apiService.get<EventResponse[]>('/company/get_events', { company_id });
	return response;
};

export const apiGetEventDetails = async (company_id: string, slug: string): Promise<ResponseObject<EventDetailsResponse>> => {
	const response = await apiService.get<EventDetailsResponse>('/company/get_event_merchants_and_offers', { company_id, slug });
	return response;
};

export const apiGetHomeEventDetails = async (company_id: string): Promise<ResponseObject<EventDetailsResponse>> => {
	const response = await apiService.post<EventDetailsResponse>('/company/get_home_page_event_offers', { company_id });
	return response;
};

export const apiGetEventBanners = async (company_id: string, slug: string): Promise<ResponseObject<EventBannerResponse[]>> => {
	const response = await apiService.get<EventBannerResponse[]>('/company/get_event_banners', { company_id, slug });
	return response;
};

export const apiGetDisclaimer = async (domain: string): Promise<ResponseObject<DisclaimerResponse>> => {
	const response = await apiService.get<DisclaimerResponse>('/company/get_disclaimer', { domain });
	return response;
};

export const apiFooterPagesData = async (domain: string, slug: string): Promise<ResponseObject<FooterPageResponse>> => {
	const response = await apiService.get<FooterPageResponse>('/company/get_footer_pages', { domain, slug });
	return response;
};

export const apiTemplate = async (domain: string): Promise<ResponseObject<Template>> => {
	const response = await apiService.get<Template>('/company/get_template', { domain });
	return response;
};

export const apiHomePageFaqs = async (domain: string): Promise<ResponseObject<Faqs[]>> => {
	const response = await apiService.get<Faqs[]>('/company/get_home_page_faqs', { domain });
	return response;
};

export const apiRecentlyUpdatedStores = async (domain: string): Promise<ResponseObject<minimalMerchantData[]>> => {
	const response = await apiService.get<minimalMerchantData[]>('/company/get_latest_updated_merchant', { domain });
	return response;
};

export const apiContactForm = async (domain: string, name: string, number: string, email: string, message: string): Promise<ResponseObject<any>> => {
	const response = await apiService.post<any>('/company/add_contact_us_list', { domain, name, number, email, message });
	return response;
};

export const apiContactPage = async (domain: string): Promise<ResponseObject<ContactPageResponse>> => {
	const response = await apiService.get<ContactPageResponse>('/company/get_company_us_page_details', { domain });
	return response;
};

export const apiCategoryWithSub = async (company_id: string): Promise<ResponseObject<CategoryWithSub[]>> => {
	const response = await apiService.post<CategoryWithSub[]>('/company/get_new_category', { company_id });
	return response;
};

export const apiCategoryOffers = async (category_id: string, company_id: string, page: number): Promise<ResponseObject<CategoryOffers>> => {
	const response = await apiService.post<CategoryOffers>('/company/get_offer_category_wise', { category_id, company_id, page });
	return response;
};

export const apiCategoryOfferBanners = async (category_id: string, company_id: string, page: number): Promise<ResponseObject<OfferResponse>> => {
	const response = await apiService.post<OfferResponse>('/company/get_banner_offer_category_wise', { category_id, company_id, page });
	return response;
};

export const apiSuggestedCategory = async (category_id: string): Promise<ResponseObject<SuggestedCategoriesResponse>> => {
	const response = await apiService.post<SuggestedCategoriesResponse>('/company/get_suggested_categories', { category_id });
	return response;
};

export const apiGetAllProducts = async (company_id: string, category_id?: string, page?: string, per_page: number = 30): Promise<ResponseObject<OfferResponse>> => {
	const response = await apiService.post<OfferResponse>('/company/get_all_products', { company_id, category_id, page, per_page });
	return response;
};

export const apiGetAllEvents = async (domain: string): Promise<ResponseObject<EventResponse[]>> => {
	const response = await apiService.get<EventResponse[]>('/company/get_all_events', { domain });
	return response;
};

export const apiGetAllPromotion = async (domain: string): Promise<ResponseObject<Promotion[]>> => {
	const response = await apiService.get<Promotion[]>('/company/get_all_promotions', { domain });
	return response;
};

export const apiGetPromotionDetails = async (company_id: string, slug: string): Promise<ResponseObject<PromotionDetailsResponse>> => {
	const response = await apiService.get<PromotionDetailsResponse>('/company/get_promotion_merchants_and_offers', { company_id, slug });
	return response;
};

export const apiGetPromotionBanners = async (company_id: string, slug: string): Promise<ResponseObject<PromotionBannerResponse[]>> => {
	const response = await apiService.get<PromotionBannerResponse[]>('/company/get_promotion_banners', { company_id, slug });
	return response;
};

export const apiGetPromotionSuggestedMerchants = async (company_id: string, slug: string): Promise<ResponseObject<EventMerchant[]>> => {
	const response = await apiService.post<EventMerchant[]>('/company/get_promotion_suggested_merchants', { company_id, slug });
	return response;
};

export const apiGetPromotionOfferBanners = async (company_id: string, slug: string): Promise<ResponseObject<PromotionDetailsResponse>> => {
	const response = await apiService.get<PromotionDetailsResponse>('/company/get_promotion_offer_banners', { company_id, slug });
	return response;
};

export const apiGetPromotionCategories = async (company_id: string, slug: string): Promise<ResponseObject<PromotionCategoryResponse>> => {
	const response = await apiService.get<PromotionCategoryResponse>('/company/get_promotion_category', { company_id, slug });
	return response;
};

export const apiGetMultiProductOffers = async (company_id: string): Promise<ResponseObject<HomeMultiProducts>> => {
	const response = await apiService.post<HomeMultiProducts>('/company/get_home_page_popular_products', { company_id });
	return response;
};

export const apiGetProductMerchants = async (company_id: string): Promise<ResponseObject<minimalMerchantData[]>> => {
	const response = await apiService.post<minimalMerchantData[]>('/company/get_products', { company_id });
	return response;
};

export const apiGetMerchantProducts = async (company_id: string, slug: string): Promise<ResponseObject<ProductData[]>> => {
	const response = await apiService.post<ProductData[]>('/company/get_product_merchant', { company_id, slug });
	return response;
};

export const apiGetCategoryProducts = async (company_id: string, slug: string): Promise<ResponseObject<ProductCategory[]>> => {
	const response = await apiService.post<ProductCategory[]>('/company/get_product_category', { company_id, slug });
	return response;
};

export const apiGetCategoryProductsOffer = async (company_id: string, slug: string, category_slug: string): Promise<ResponseObject<ProductData[]>> => {
	const response = await apiService.post<ProductData[]>('/company/get_product_by_category', { company_id, slug, category_slug });
	return response;
};

export const apiGetProductDetails = async (company_id: string, product_id: string, store_slug: string): Promise<ResponseObject<Offer>> => {
	const response = await apiService.post<Offer>('/company/get_product_detail', { company_id, product_id, store_slug });
	return response;
};

export const api404NotFound = async (domain: string, url: string): Promise<ResponseObject<NotFound>> => {
	const response = await apiService.post<NotFound>('/company/company_404_request', { domain, url });
	return response;
};