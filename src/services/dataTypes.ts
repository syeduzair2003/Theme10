/* Api Responses */
export type ResponseObject<T> = {
  status: boolean | string | number,
  message: string | null,
  data: T,
}

export type AffiliateNetwork = {
  id: number;
  network_name: string;
  website_url: string;
  affiliate_tracking_code: string;
  contact_email: string;
  unique_id: string;
  status: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  pivot: {
    company_id: number;
    affiliate_network_id: number;
  };
};

export type Merchant = {
  id: number;
  unique_id: string;
  merchant_name: string;
  slug: string;
  merchant_detail: string | null;
  website_url: string;
  merchant_category?: string | null;
  affiliate_network_id?: number;
  added_by: number;
  is_system: number;
  is_approved: number;
  is_rejected: number;
  is_seen: number;
  contact_person_name?: string;
  contact_email?: string;
  merchant_logo: string;
  website_screen_short?: string;
  status?: boolean;
  created_at?: string;
  updated_at?: string;
  discount_tag?: string | null;
  rating: number;
  total_offers: number;
  promotional_tag: string;
  pivot?: {
    company_id: number;
    merchant_id: number;
  };
  faqs: Faqs[] | [];
};

export type Faqs = {
  question: string;
  answer: string;
}

export type User = {
  id: number;
  unique_id: string;
  theme: string;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
};

export type Package = {
  id: number;
  unique_id: string;
  name: string;
  description: string;
  price: string;
  status: number;
  created_at: string;
  updated_at: string;
};

export type Template = {
  id: number;
  name: string;
  slug: string;
  unique_id: string;
  preview_image: string | null;
  preview_link: string | null;
  created_at: string;
  updated_at: string;
};

export type CompanyData = {
  id: number;
  domain: string;
  unique_id: string;
  permanent_domain: string;
  slug_type: string;
  store_slug: string;
  category_slug: string;
  store_url: string;
  promotion_slug: string;
  out_link: string;
  company_name: string;
  company_logo: string | null;
  company_footer_logo: string | null;
  site_title: string;
  site_discription: string | null;
  site_icon: string | null;
  template_id: number;
  blog_title: string;
  blog_url: string;
  facebook: string | null;
  twitter: string | null;
  linkedin: string | null;
  pinterest: string | null;
  youtube: string | null;
  instagram: string | null;
  flipboard: string | null;
  threads: string | null;
  tiktok: string | null;
  slider_status: 1 | 0;
  banner_status: 1 | 0;
  center_text_status: 1 | 0;
  header_merchants_status: 1 | 0;
  top_merchants_status: 1 | 0;
  popular_offers_status: 1 | 0;
  popular_deals_status: 1 | 0;
  top_categories_status: 1 | 0;
  website_is_active: 1 | 0;
  company_alternate_name: string | null;
  company_legal_name: string | null;
  trust_pilot: string | null;
  template: {
    id: number;
    name: string;
  };
  company_slider: CompanySlider[];
  widgets: Record<string, Widget[]>;
};

export type MetaResponse = {
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  og_title: string;
  twitter_title: string;
  twitter_description: string;
  merchant_logo: string | null;
  og_image: string | null;
  company_data: {
      id: number,
      unique_id: string,
      company_name: string,
      company_logo: string | null,
      site_icon: string | null,
      store_slug: string,
      category_slug: string,
      promotion_slug: string,
      widgets: Widget[]
  };
  pagination: PaginationType;
}

export type Widget = {
  type: string;
  data: string[] | string;
  google_site_verification_content?: string;
}

export type WidgetResponse = {
  HEADER?: Widget[];
  BODY_TOP?: Widget[];
  BODY_BOTTOM?: Widget[];
}

export type CompanySlider = {
  id: number;
  company_id: number;
  text: string | null;
  button_link: string;
  button_text?: string | null;
  slider_image: string;
  created_at: string;
  updated_at: string | null;
}
export type PaginationType = {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
  next_page: number | null;
  prev_page: number | null;
}

export type OfferMerchant = {
  id: number;
  unique_id: string;
  merchant_name: string;
  slug: string;
  merchant_detail: string | null;
  website_url: string;
  merchant_category: string | null;
  affiliate_network_id: number;
  contact_person_name: string;
  contact_email: string;
  merchant_logo: string;
  website_screen_short: string;
  status: boolean;
  created_at: string;
  updated_at: string;
}

export type OfferType = {
  id: number;
  name: string;
}
export type Offer = {
  id: number;
  unique_id: string;
  offer_title: string;
  offer_detail: string;
  merchant_id: number;
  offer_type_id: number;
  life_time: 1 | 0;
  start_date: string | null;
  end_date: string | null;
  coupon_code: string | null;
  status: 1 | 0;
  target_country: string | null;
  keywords: string | null;
  url: string;
  banner_image: string | null;
  company_id: number | null;
  link_id: number;
  offer_type: OfferType;
  banner_size: string | null;
  click_count: any;
  like_count: any;
  dislike_count: any;
  rating: number;
  total_offers: number;
  product_image: string;
  original_price: string | null;
  sale_price: string;
  currency: string | null,
  updated_at?: string | null,
  created_at?: string | null,
  is_detail?: number;
  slug: string | null;
  merchant: {
    rating: number;
    merchant_logo: string;
    id: number;
    unique_id: string;
    merchant_name: string;
    slug: string;
  },
  category?: ProductCategory | null;
}
export type OffersMerchant = {
  id: number;
  unique_id: string;
  merchant_name: string;
  slug: string;
  merchant_detail: string | null;
  website_url: string;
  affiliate_network_id: number;
  added_by: number;
  is_system: number;
  is_approved: number;
  is_rejected: number;
  is_seen: number;
  contact_person_name: string;
  contact_email: string;
  status: boolean;
  merchant_logo: string;
  website_screen_short: string | null;
  advertiser_id: any | null;
  created_at: string;
  updated_at: string;
  rating: number;
  total_offers: number;
}
export type OffersOffer = {
  id: number;
  offer_id: number;
  merchant_id: number;
  company_id: number;
  affiliate_network_id: number;
  status: number;
  created_at: string;
  updated_at: string | null;
  rating?: number;
  offer: Offer;
  merchant: OffersMerchant;
}

export type OfferResponse = {
  offers: OffersOffer[];
  merchant_slug: string;
  pagination: PaginationType;
}

export type CategoryData = {
  id: number;
  unique_id: string;
  name: string;
  details: string | null;
  slug: string;
  status: 1 | 0;
  category_image: string | null;
  created_at: string | null;
  updated_at: string | null;
  deleted_at: string | null;
  total_offers: number;
  url: string;
  parent_category_id: string | null;
}
export type TopCategoryData = {
  id: number;
  unique_id: string;
  name: string;
  details: string | null;
  slug: string;
  status: 1 | 0;
  category_image: string | null;
}

export type CompanyWiseOfferType = {
  id: number;
  name: string;
};

export type CompanyWiseOffer = {
  id: number;
  offer_title: string | null;
  offer_detail: string | null;
  offer_type_id: number;
  offer_type: CompanyWiseOfferType;
}
export type CompanyWiseResponse = {
  id: number;
  merchant_id: number;
  offer_id: number;
  company_id: number;
  rating: number;
  offer: CompanyWiseOffer;
}
export type CompanyWiseMerchant = {
  id: number;
  unique_id: string;
  merchant_name: string;
  slug: string;
  merchant_detail: string | null;
  website_url: string;
  affiliate_network_id: number;
  added_by: number;
  is_system: number;
  is_approved: number;
  is_rejected: number;
  is_seen: number;
  contact_person_name: string;
  contact_email: string;
  status: boolean;
  merchant_logo: string;
  website_screen_short: string | null;
  advertiser_id: string;
  created_at: string;
  updated_at: string;
  rating: number;
  total_offers?: number;
};
export type SearchMerchant = {
  id: number;
  unique_id: string;
  merchant_name: string;
  slug: string;
  merchant_detail: string | null;
  website_url: string;
  affiliate_network_id: number;
  added_by: number;
  is_system: number;
  is_approved: number;
  is_rejected: number;
  is_seen: number;
  contact_person_name: string;
  contact_email: string;
  status: boolean;
  merchant_logo: string;
  website_screen_short: string;
  advertiser_id: string;
  created_at: string;
  updated_at: string;
  rating: number;
}
export type SearchCategories = {
  id: number;
  unique_id: string;
  name: string;
  details: string | null;
  slug: string;
  status: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  category_image: string;
  url: string;
  total_offers: string;
}
export type SearchOffers = {
  id: number;
  unique_id: string;
  offer_title: string;
  offer_detail: string;
  merchant_id: number;
  offer_type_id: number;
  life_time: number;
  start_date: string | null;
  end_date: string | null;
  coupon_code: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  status: number;
  target_country: string | null;
  keywords: string | null;
  url: string;
  banner_image: string | null;
  company_id: number | null;
  link_id: number;
  offer_type: OfferType;
  merchant: Merchant;
}
export type SearchResponse = {
  merchants: SearchMerchant[];
  categories: SearchCategories[];
  offers: SearchOffers[];
}

export type Comments = {
  id: number;
  offer_id: number;
  company_id: number;
  comment: string;
  rating: number;
  created_at: string;
  updated_at: string | null;
}

export type FooterResponse = {
  link: string;
  title: string;
  featured_image: string;
  text: string;
  date: string;
}

export type CompanyBanner = {
  id: number;
  company_id: number;
  image: string;
  url: string;
  text: string;
}

export type StepsToAvail = {
  id: number;
  heading: string;
  company_id: number;
  text: string;
  created_at: string;
  updated_at: string | null;
}

export type minimalMerchantData = {
  merchant_name: string;
  merchant_logo: string | null;
  slug?: string;
  id?: number;
  unique_id?: string;
  rating?: number | null;
  total_offers?: number | null;
  details?: string | null;
  promotional_tag?: string;
}

export type categoryMinimalData = {
  name: string;
  category_image: string | null;
  slug: string;
  unique_id: string;
  id: number;
}

export type offerBannerMinimalData = {
  banner_image: string | null;
  offer_title: string;
  offer_detail: string;
  url: string;
  unique_id: string;
  banner_size?: string |null;
  merchant: minimalMerchantData;
}

export type CategorySlugData = {
  id: number;
  unique_id: string;
  name: string;
  slug: string;
}

export type MerchantSlugData = {
  id: number;
  unique_id: string;
  merchant_name: string;
  slug: string;
}

export type EventResponse = {
  id: number,
  unique_id: string,
  name: string,
  company_id: number,
  slug: string,
  meta_title: string,
  meta_description: string,
  meta_keywords: string,
  description: string,
  start_date: string,
  end_date: string,
  is_active: number,
  recurring: number,
  created_at: string,
  updated_at: string,
}

export type MerchantWithOffers = {
  id: number;
  unique_id: string;
  merchant_name: string;
  slug: string;
  merchant_detail: string;
  website_url: string;
  merchant_category: string | null;
  affiliate_network_id: number;
  added_by: number;
  is_system: number;
  is_approved: number;
  is_rejected: number;
  is_seen: number;
  contact_person_name: string;
  contact_email: string;
  merchant_logo: string;
  website_screen_short: string;
  status: boolean;
  advertiser_id: number | null;
  created_at: string;
  updated_at: string;
  offers: Offer[]
}

export type EventDetailsResponse = {
  event: EventResponse;
  merchants: MerchantWithOffers[];
};

export type PromotionDetailsResponse = {
  promotion: Promotion;
  merchants: MerchantWithOffers[];
};

export type EventBannerResponse = {
  id: number,
  event_id: number,
  banner: string,
}

export type PromotionBannerResponse = {
  id: number,
  promotion_id: number,
  banner: string,
}

export type Disclaimer = {
  id: number,
  company_id: number,
  disclaimer: string,
}

export type FooterPages = {
  page_name: string;
  slug: string;
}

export type DisclaimerResponse = {
  disclaimer: Disclaimer;
  footer_pages: FooterPages[];
  CompanyContactUs: ContactInfo,
}

export type MerchantResponse = {
  merchants: Merchant[];
  pagination: PaginationType;
}

export type FooterPageResponse = {
  id: number,
  company_id: number,
  page_name: string,
  page_description: string,
  meta_title: string,
  meta_description: string,
  slug: string
}

export type TopMerchantResponse = {
  merchants: Merchant[];
  top_merchants_widget: {
    id: number,
    company_id: number,
    widget_type: string,
    widget_heading: string,
    widget_text: string,
  }
}

export type HomeOfferResponse = {
  offers: OffersOffer[];
  popular_deals_widget: {
    id: number,
    company_id: number,
    widget_type: string,
    widget_heading: string,
    widget_text: string,
  }
}

export type HomeDealsResponse = {
  offers: OffersOffer[];
  popular_offer_widget: {
    id: number,
    company_id: number,
    widget_type: string,
    widget_heading: string,
    widget_text: string,
  }
}

export type HomeCategoryResponse = {
  categories: CategoryData[];
  top_category_widget: {
    id: number,
    company_id: number,
    widget_type: string,
    widget_heading: string,
    widget_text: string,
  }
}

export type ContactPageResponse = {
  company_data: {
    facebook: string,
    instagram: string,
    twitter: string,
    linkedin: string,
    pinterest: string,
    youtube: string,
    flipboard: string,
    tiktok: string,
    threads: string,
  },
  CompanyContactUs: ContactInfo,
}

export type ContactInfo = {
  phone_no: string,
  email: string,
  address: string,
  details: string,
}

export type MetaKeywordsResponse = {
  keyword: string,
    merchant: {
      id: number,
      unique_id: string,
      slug: string
    }
}

export type CategoryWithSub = {
  category: {
    name: string,
    url: string,
    child: CategoryChild[],
    image: string,
    created_at: string;
    updated_at: string;
  }
}

export type CategoryChild = {
  id: number,
  name: string,
  url: string,
  total_offers: number,
  image: string,
  child?: CategoryChild[],
  created_at: string;
  updated_at: string;
}

export type SuggestedCategoriesResponse = {
  categories: CategoryData[],
  parent_category: string,
}

export type HomeProductsResponse = {
  offers: OffersOffer[];
  home_page_widget: {
    id: number,
    company_id: number,
    widget_type: string,
    widget_heading: string,
    widget_text: string,
  }
}

export type CategoryOffers = {
  featured_offers: OffersOffer[];
  offers: OffersOffer[];
  merchant_slug: string;
  pagination: PaginationType;
}

export type EventMerchant = {
  id: number,
  unique_id: string,
  merchant_name: string,
  merchant_detail?: string | null,
  merchant_logo: string,
  slug: string,
  promotional_tag: string
}

export type Promotion = {
  id: number,
  unique_id: string,
  name: string,
  company_id: number,
  slug: string,
  meta_title: string,
  meta_description: string,
  meta_keywords: string,
  description: string,
  start_date: string | null,
  end_date: string | null,
  is_active: boolean,
  created_at: string,
  updated_at: string
}

export type PromoCategory = {
  category_id: number,
  category_name: string,
  unique_id: string,
  url: string,
  slug: string,
}

export type PromotionCategoryResponse = {
  promotion: Promotion;
  selected_categories: PromoCategory[];
};

export type SubPromotion = {
  id: number,
  unique_id: string,
  company_id: number,
  promotion_id: number,
  category_name: string,
  category_detail: string | null,
  category_slug: string,
  category_image: string,
  status: boolean,
  created_at: string,
  updated_at: string,
}

export type SubPromotionBanner = {
  id: number,
  promotion_id: number,
  custom_category_id: number,
  banner: string,
  created_at: string,
  updated_at: string,
  promotion: Promotion
}

export type TopCashBackMerchantResponse = {
  merchants: Merchant[];
  cashback_merchants_widget: {
    id: number,
    company_id: number,
    widget_type: string,
    widget_heading: string,
    widget_text: string,
  }
}

export type HomeMultiProducts = {
  first: HomeMultiProductData;
  second: HomeMultiProductData;
};
export type HomeMultiProductData ={
  merchant: Merchant;
  offers: OffersOffer[];
  home_page_widget: {
    id: number,
    company_id: number,
    widget_type: string,
    widget_heading: string,
    widget_text: string,
  }
}
export type ProductData = {
  id: number,
  unique_id: string,
  offer_title: string,
  click_count: number,
  like_count: number,
  dislike_count: number,
  offer_detail: string,
  merchant_id: number,
  offer_type_id: number,
  offer_og_image: string | null,
  life_time: number,
  start_date: string | null,
  end_date: string,
  currency: string,
  coupon_code: string | null,
  target_country: string,
  keywords: string | null,
  url: string,
  banner_image: string | null,
  banner_size: string | null,
  product_image: string,
  original_price: string,
  sale_price: string,
  status: number,
  created_at: string,
  updated_at: string,
  company_id: string | null,
  link_id: string,
  deleted_at: string | null,
  slug: string,
  category_id: number | null,           // new
  offer_type: OfferType;
  category?: ProductCategory | null;    // new
  is_detail?: number;
}

export type ProductCategory = {
  id: number;
  unique_id: string;
  name: string;
  slug: string;
}

export type ProductCategoryData = {
  id: number;
  unique_id: string;
  name: string;
  slug: string;
  created_at: string | null;
  updated_at: string | null ; 
}

export type NotFound ={
  is_seen: boolean;
  url:string;
  company_id: string;
  updated_at: string | null;
  created_at: string | null;
  id: number;
}