import { faGreaterThan, FontAwesomeIcon } from '@/constants/icons'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import CatPage from '@/components/Theme-3/comp/CatPage'
import cookieService from '@/services/CookiesService'
import { apiCompanyUpdatedData } from '@/apis/user'
import CategoryPageSchema from '@/components/shared/SchemaScripts/CategoryPageSchema'

const page = async () => {
    const companyDomain = await cookieService.get("domain");
    const response = (await apiCompanyUpdatedData(companyDomain)).data;

    const socialLinks = {
        facebook: response?.facebook,
        twitter: response?.twitter,
        instagram: response?.instagram,
        linkedin: response?.linkedin,
        pinterest: response?.pinterest,
        youtube: response?.youtube,
        flipboard: response?.flipboard,
        tiktok: response?.tiktok,
        threads: response?.threads,
    };

    return (
        <>
            <section className="banner-section index-one overflow-hidden position-relative s1-2nd-bg-color rounded-3 cus-border border">
                <div className="container position-relative">
                    <div className="row g-9 g-lg-0 align-items-center d-flex">
                        <div className="col-lg-6 pe-4 pe-md-10 d-flex flex-column">
                            <div className="d-grid gap-4 gap-md-6 position-relative cus-z1">
                                <h1 className="display-four n17-color f-38">Our Popular Categories</h1>
                                <div className="breadcrumb-area">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb second position-relative m-0 d-center justify-content-start gap-2 gap-md-3">
                                            <li className="d-flex align-items-center fs-seven justify-content-center gap-2">
                                                <Link href={`/`} className="n17-color">Home</Link>
                                                <FontAwesomeIcon icon={faGreaterThan} style={{ width: '12px', height: '12px', color: '#222e48' }} />
                                            </li>
                                            <li className="breadcrumb-item d-flex align-items-center fs-seven active" aria-current="page"><span className="fw-mid f5-color text-capitalize">Category</span></li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 pe-4 pe-md-10 d-flex flex-column">
                            <div className="img-area d-flex justify-content-end align-items-end" style={{ width: '100%', height: '100%' }}>
                                <Image src="/themes/Theme_3/images/banner-illus-1.png" alt="img" width={300} height={260} style={{ objectFit: 'contain' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="section-sidebar" style={{ paddingTop: '20px', paddingBottom: '50px' }}>
                <div className="container">
                    {/* <div className="row">
                        <div className="col-xxl-12 cus-z1">
                            <div className="row cus-row top-stores trending-features g-3 d-flex flex-row flex-wrap">
                                {categories?.data?.map((category: CategoryData) => (
                                    <CategoryCards
                                        key={category.id}
                                        category={category}
                                        cat_slug={category_slug}
                                        slug_type={slug_type}
                                        companyId={company_id}
                                        merchant_slug={store_slug}
                                        domain={companyDomain}
                                    />
                                ))}
                            </div>
                        </div>
                    </div> */}
                    <CatPage company_id={response?.unique_id} />
                </div>
            </div>
            <CategoryPageSchema company_name={response?.company_name} company_logo={response?.company_logo} socialLinks={socialLinks} company_id={response?.unique_id} />
        </>
    )
}

export default page
