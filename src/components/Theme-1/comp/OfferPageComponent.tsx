import VerticalOfferBanner from "./VerticalOfferBanner";
import TagsSidebar from "./TagsSidebar";
import OffersLazyLoading from "./OffersLazyLoading";
import { apiOfferBanners, apiSpecificOffers } from "@/apis/offers";
import { apiGetSimilarMerchants, apiMerchantDetails } from "@/apis/merchant";
import ExclusiveMerchants from "./ExclusiveMerchants";
import cookieService from "@/services/CookiesService";
import { apiCategoryData, apiGetMetaData } from "@/apis/user";
import { cleanHtmlContent, discardHTMLTags, extractFirstSentences, filterOfferBanners, getBaseImageUrl, getRandomStoreSeoTitle, splitHeadingFromDetails } from "@/constants/hooks";
import SideBarFilter from "./SideBarFilter";
import Link from "next/link";
import { Accordion } from "react-bootstrap";
import MerchantFaqsAccordion from "./MerchantFaqsAccordion";
import MerchantSchemaScripts from "@/components/shared/SchemaScripts/MerchantSchemaScripts";
import { stripHtml } from "string-strip-html";

interface Props {
  merchant_id: string;
  product_id: Promise<string>;
  slug: string[];
  company_id: string;
  socialLinks?: {
    facebook?: string | undefined | null;
    twitter?: string | undefined | null;
    instagram?: string | undefined | null;
    linkedin?: string | undefined | null;
    pinterest?: string | undefined | null;
    youtube?: string | undefined | null;
    flipboard?: string | undefined | null;
    tiktok?: string | undefined | null;
    threads?: string | undefined | null;
  };
  store_slug: string;
  slug_type: string;
  category_slug: string;
  company_name: string;
  company_logo: string;
}

const OfferPageComponent = async ({ merchant_id, product_id, slug, company_id, store_slug, slug_type, category_slug, company_name, company_logo, socialLinks }: Props) => {
  const awaited_p_id = await product_id;
  const bannerResponse = await apiOfferBanners(merchant_id, company_id);
  const categories = await apiCategoryData(company_id)
  const offers = await apiSpecificOffers(merchant_id, company_id, 1);
  const similarMerchant = await (await apiGetSimilarMerchants(company_id, merchant_id)).data;
  const companyDomain = (await cookieService.get("domain")).domain;
  const filteredVerticalBanners = filterOfferBanners(bannerResponse.data?.offers || [], 50, 2000, 65, 2000);
  const meta = (await apiGetMetaData(JSON.stringify(slug), companyDomain)).data;
  const merchant_details = {
    ...(await apiMerchantDetails(merchant_id, company_id)),
    mer_meta_title: meta.meta_title,
    mer_meta_desc: meta.meta_description,
  };
  const [heading, details] = splitHeadingFromDetails(merchant_details?.data?.merchant_detail);
  const cleanText = cleanHtmlContent(details || '');
  const plainText = stripHtml(cleanText).result;
  
  return (
    <>
      <section className="all-product padding-y-60 custom-bg-color-one">
        <div className="container container-two">
          <div className="row">
            <div className="col-xl-3 col-lg-4">
              <ul className="breadcrumb-list flx-align gap-2 pb-4">
                <li className="breadcrumb-list__item font-14 text-body">
                  <Link
                    href="/"
                    className="breadcrumb-list__link text-body hover-text-main"
                  >
                    Home
                  </Link>
                </li>
                <li className="breadcrumb-list__item font-14 text-body">
                  <span className="breadcrumb-list__icon font-10">
                    <i className="fas fa-chevron-right" />
                  </span>
                </li>
                <Link href={`/${store_slug}`} className='breadcrumb-list__link text-body hover-text-main'>
                  <li className="breadcrumb-list__item font-14 text-body">
                    <span className="breadcrumb-list__text text-capitalize">{store_slug}</span>
                  </li>
                </Link>
                <li className="breadcrumb-list__item font-14 text-body">
                  <span className="breadcrumb-list__icon font-10">
                    <i className="fas fa-chevron-right" />
                  </span>
                </li>
                <li className="breadcrumb-list__item font-14 text-body">
                  <span className="breadcrumb-list__text text-capitalize">{merchant_details?.data?.merchant_name}</span>
                </li>
              </ul>
              <ExclusiveMerchants
                merchants={similarMerchant}
                mer_slug_type={slug_type}
                mer_slug={store_slug}
                heading="Similar Stores"
              />
              {merchant_details.data?.faqs.length > 0 && (
                <div className="common-sidebar-wrapper mb-3 sidebar-bg">
                  <div className="common-sidebar">
                    <div className="common-sidebar__item">
                      {merchant_details?.data?.merchant_name.length > 15 ? (
                        <h5 className="common-sidebar__title f-25">{`${merchant_details?.data?.merchant_name} FAQs`}</h5>
                      ) : (
                        <h4 className="display-four n17-color mb-4 mb-md-6 f-30">{`${merchant_details?.data?.merchant_name} FAQs`}</h4>
                      )}
                      <div className="thumb-area rounded-2" style={{ width: '100%', maxWidth: '100%' }}>
                        <Accordion defaultActiveKey="0" flush>
                          {merchant_details.data?.faqs.length > 0 && merchant_details?.data?.faqs.map((faqs, i) => (
                            <MerchantFaqsAccordion key={i} faq={faqs} index={i} />
                          ))}
                        </Accordion>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <TagsSidebar
                merchant_id={merchant_id}
                company_id={company_id} />
              <SideBarFilter categories={categories?.data} cat_slug={category_slug} slug_type={slug_type} mt="3" />
            </div>
            <div className="col-xl-6 col-lg-3">
              <div className="gap-3 flex-wrap mb-5 mb-md-8">
                {heading
                  ? (
                    <h1 className="display-four n17-color mb-4 mb-md-6 f-30">
                      {discardHTMLTags(heading)}
                    </h1>
                  )
                  : (
                    merchant_details?.data?.merchant_name.length > 15 ? (
                      <h1 className="display-four n17-color mb-4 mb-md-6 fs-three f-25">
                        {getRandomStoreSeoTitle(merchant_details?.data?.merchant_name)}
                      </h1>
                    ) : (
                      <h1 className="display-four n17-color mb-4 mb-md-6 f-30">
                        {getRandomStoreSeoTitle(merchant_details?.data?.merchant_name)}
                      </h1>
                    )
                  )
                }
                {/* <MerchantDetailsSSR details={details} slug={merchant_details.data.unique_id} /> */}
                <div className="merchant-details-wrapper text-jus w-100" id="merhchantDetailsShort">
                  <div className="text-container">
                    <span className="text-content custom-mer-det-css truncate-3-lines">
                      {extractFirstSentences(plainText)}
                    </span>
                    <span className="toggle-button">
                      <Link href={`#fullDetails`}>See Full Details</Link>
                    </span>
                  </div>
                </div>
              </div>
              {offers?.data?.offers.length > 0 ? (
              <OffersLazyLoading
                initialOffers={offers?.data?.offers}
                merchant_id={merchant_id}
                company_id={company_id}
                product_id={awaited_p_id}
                mer_slug={store_slug}
                slug_type={slug_type}
                offerBanner={bannerResponse?.data?.offers}
                merchantName={merchant_details?.data?.merchant_name}
                domain={companyDomain}
                pagination={offers?.data?.pagination}
              />
              ) : (
                <section className="product-shop-full-grid">
                  <div className="container">
                    <div className="row">
                      <div className="section-title-center text-center mt-5">
                        <div className="col-12">
                          <div className="d-flex justify-content-center align-items-center" style={{ height: "100px" }}>
                            <h3 className="fs-three n17-color text-danger">No offers found</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}
              <div id="fullDetails" className="merchant-details-wrapper text-jus w-100 pt-4 mt-5">
                <div className="text-container">
                    <span
                      className="text-content custom-mer-det-css"
                      dangerouslySetInnerHTML={{ __html: cleanText }}
                    />
                </div>
            </div>
            </div>
            <div className="col-lg-3 mt-5">
              {bannerResponse.data?.offers && filteredVerticalBanners?.length > 0 && (
                <VerticalOfferBanner bannerResponse={bannerResponse.data?.offers} domain={companyDomain} mer_slug={store_slug} slug_type={slug_type} merchantId={merchant_id} companyId={company_id} />
              )}
            </div>
          </div>
        </div>
      </section>
      <MerchantSchemaScripts
        domain={companyDomain}
        mer_slug={store_slug}
        slug_type={slug_type}
        merchant_detail={merchant_details}
      />
    </>
  );
};

export default OfferPageComponent;
