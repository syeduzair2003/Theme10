import { apiCompanyUpdatedData, apiGetProductMerchants } from '@/apis/user';
import cookieService from '@/services/CookiesService';
import React from 'react'
import BreadcrumbSection from '../../comp/BreadcrumbSection';
import MerchantCard from '../../comp/MerchantCard';
import { getProductMerchantHref } from '@/constants/hooks';
import ProductsSchema from '@/components/shared/SchemaScripts/ProductsSchema';
const page = async () => {
    const companyDomain = (await cookieService.get("domain"));
    const companyData = (await apiCompanyUpdatedData(companyDomain)).data;
    const merchants = (await apiGetProductMerchants(companyData?.unique_id)).data;

    const breadcrumbs = [
        { label: "Home", href: "/" },
        { label: "Products" },
    ];
    return (
        <>
            <BreadcrumbSection
                title='Get Top Discounts on Popular brand Products'
                breadcrumbs={breadcrumbs}
                imageSrc="/themes/Theme_3/img/website.png"
            />
            <div className="contact-section bg padTB60">
                <div className="container">
                    <h2 className='display-four n17-color f-28 py-5'>Browse Discounted Products from All Leading Brands</h2>
                    <div className="row cus-row d-flex justify-content-center justify-content-md-start gy-3 gy-md-4 top-stores trending-categories third">
                        {merchants?.length > 0 && merchants?.map((item, i) => (
                            <div key={i} className="col-8 col-sm-6 col-md-4 col-xl-3">
                                <MerchantCard
                                    merchant_name={item?.merchant_name}
                                    merchant_logo={item?.merchant_logo || ""}
                                    companyDomain={companyDomain.domain}
                                    merchant_href={getProductMerchantHref(item, companyData?.slug_type)}
                                    discountTag={item?.promotional_tag}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <ProductsSchema company_id={companyData.unique_id}/>
        </>
    )
}

export default page
