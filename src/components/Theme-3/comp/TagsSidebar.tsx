import { apiGetKeywords } from '@/apis/user';
import Link from 'next/link'
import React from 'react'

type Props = {
    company_id: string,
    merchant_id: string,
}

const TagsSidebar = async ({ company_id, merchant_id }: Props) => {
    const tags = await apiGetKeywords(merchant_id, company_id);
    const merchantTags: string[] = tags.data.merchant.meta_keywords
        ?.split(",")
        .map((tag: string) => tag.trim()) || [];
    if (merchantTags.length > 0) {
        return (
            <div className="single-bar">
                <span className="v-line w-100 position-relative d-center f-width pt-3 pb-3 pb-md-6"></span>
                <h4 className="n17-color mb-4 mb-md-6">Popular Tags</h4>
                <ul className="d-flex flex-wrap gap-3 gap-md-4">
                    {merchantTags.map((tag: string, i: number) => {
                        return (
                            <li key={i} className='overflow-hidden'>
                                <Link href={`/search?query=${tag}`} className="box-style box-second third-alt rounded-pill py-2 py-md-2 px-3 px-md-5 d-center d-inline-flex">
                                    {tag.split(' ').length > 5 ? (
                                        <span className="fs-six d-inline-block transition f-15 fw-5" style={{ color: 'rgb(64 74 96)', whiteSpace: 'normal' }}>
                                            {tag}
                                        </span>
                                    ) : (
                                        <span className="fs-six text-nowrap transition f-15 fw-5" style={{ color: 'rgb(64 74 96)' }}>
                                            {tag}
                                        </span>
                                    )}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default TagsSidebar
