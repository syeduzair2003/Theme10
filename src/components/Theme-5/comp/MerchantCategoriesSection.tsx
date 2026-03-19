import Link from 'next/link'
import React from 'react'

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface Props {
    merchantName: string;
    merchantSlug: string;
    categories: Category[];
}

const MerchantCategoriesSection = ({ merchantName, merchantSlug, categories }: Props) => {
    if (!categories?.length) return null;

    return (
        <section className="py-12 bg-slate-50">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="text-center mb-10">
                    <h3 className="text-3xl font-black text-slate-900 capitalize">
                        {merchantName} Categories
                    </h3>
                </div>

                <div className="flex flex-wrap justify-center gap-3">
                    {categories.map((item, i) => (
                        <Link
                            key={item.id || i}
                            href={`/products/${merchantSlug}/${item.slug}`}
                            className="group px-5 py-1.5 bg-slate-100 rounded-full border border-slate-200 hover:bg-slate-900 hover:border-slate-900 transition-all duration-200"
                        >
                            <h4 className="text-sm font-bold text-slate-700 group-hover:text-white transition-colors text-center">
                                {item.name}
                            </h4>  
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default MerchantCategoriesSection
