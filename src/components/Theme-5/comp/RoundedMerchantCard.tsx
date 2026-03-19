import React from 'react'
import Link from 'next/link'
import { getBaseImageUrl, getMerchantHref } from '@/constants/hooks'
import Image from 'next/image'

interface RoundedMerchantCardProps {
  merchant: any
  companyDomain: string
  merSlug: string
  slugType: string
}

const RoundedMerchantCard = ({ merchant, companyDomain, merSlug, slugType }: RoundedMerchantCardProps) => {
  const type = merchant?.product_image ? "product" : "merchant"
  const imageSrc = type === "product"
    ? getBaseImageUrl(companyDomain, merchant?.product_image, "")
    : getBaseImageUrl(companyDomain, merchant?.merchant_logo, "")
  const merchantHref = getMerchantHref(merchant, merSlug, slugType)
  return (
    <Link
      href={merchantHref}
      className="group bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-300 flex flex-col items-center justify-center text-center"
    >
      <div className="w-20 h-20 flex items-center justify-center mb-4 transition-all duration-300">
        <Image
          src={imageSrc}
          alt={merchant?.merchant_name}
          fill
          className="max-w-full max-h-full object-contain"
        />
      </div>
      <h4 className="font-bold text-slate-800 text-sm group-hover:text-indigo-600 transition-colors">{merchant?.merchant_name}</h4>
    </Link>
  )
}

export default RoundedMerchantCard