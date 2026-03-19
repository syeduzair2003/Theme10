import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { apiCategoryData, apiCategoryWithSub } from '@/apis/user'
import { apiGetMerchants } from '@/apis/merchant'
import cookieService from '@/services/CookiesService'
import CatPage from './CategoryListing'

interface Props {
    company_id: string;
    category_slug: string;
    store_slug: string;
    slug_type: string;
}

const HomePageCategoryMerchant = async ({ company_id, category_slug, store_slug, slug_type }: Props) => {
    const merchants = (await apiGetMerchants(company_id)).data
    // const categories = (await apiCategoryData(company_id)).data;
    const categories = (await apiCategoryWithSub(company_id)).data;
    const domain = (await cookieService.get("domain")).domain;
    const minimalMerchantData = merchants.map(m => ({
        merchant_name: m.merchant_name,
        merchant_logo: m.merchant_logo,
        slug: m.slug,
        unique_id: m.unique_id,
        id: m.id,
    }));

    // const minimalCategoryData = categories.map(c => ({
    //     name: c.name,
    //     category_image: c?.category_image,
    //     slug: c.slug,
    //     unique_id: c.unique_id,
    //     id: c.id,
    // }));

    return (
        <section className="arrival-product custom-bg-color-one position-relative z-index-1" style={{ paddingBottom: "40px" }}>
            <Image
                src='/themes/Theme_1/images/gradients/product-gradient.png'
                alt="gradient"
                className="element one"
                height={100}
                width={100}
            />
            <div className="container container-two">
                <div className="section-heading">
                    <h1 className="section-heading__title">New Trending Categories</h1>
                    <ul className="breadcrumb-list flx-align justify-content-center gap-2 mb-2">
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
                        <li className="breadcrumb-list__item font-14 text-body">
                            <span className="breadcrumb-list__text text-capitalize">{category_slug}</span>
                        </li>
                    </ul>
                </div>
                {/* <MerchantCategoryFilterHome
                    categories={minimalCategoryData}
                    merchants={minimalMerchantData}
                    slug_type={slug_type}
                    merchant_slug={store_slug}
                    cat_slug={category_slug}
                    companyId={company_id}
                    domain={domain}
                /> */}
                <CatPage company_id={company_id}/>
            </div>
        </section>
    )
}

export default HomePageCategoryMerchant
