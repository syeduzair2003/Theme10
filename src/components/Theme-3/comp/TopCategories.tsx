import { CategoryData } from '@/services/dataTypes';
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { getBaseImageUrl } from '@/constants/hooks';
import cookieService from '@/services/CookiesService';
// import Image from "@/components/shared/Image";

interface Props {
    category: CategoryData;
}
const TopCategories = async ({ category }: Props) => {
    const companyDomain = await cookieService.get("domain");

    return (
        <div className="custom-col my-custom-ani">
            <div className="custom-card position-relative gap-3 rounded-3">
                <Link href={`/${category?.url}`} className='my-auto' style={{paddingLeft: '10px'}}>
                    <div className="rounded-circle">
                        {category?.category_image &&
                        <Image
                        src={getBaseImageUrl(companyDomain.domain,category?.category_image, "")}
                        width={60} height={60}
                        alt={category?.name}
                        objectFit='cover'
                        className="category-img"
                        loading='lazy'
                        />
                        }
                    </div>
                </Link>
                <div className="category-main-text text-center">
                    <Link href={`/${category?.url}`}>
                        <h4 className="brand-name fw-bold fw-5 mb-2 f-18">{category?.name}</h4>
                    </Link>
                    {category?.total_offers &&
                    <span className="offers-info">{category?.total_offers ? category?.total_offers : 10} Offers Available</span>
                    }
                </div>
            </div>
        </div>

    )
}

export default TopCategories
