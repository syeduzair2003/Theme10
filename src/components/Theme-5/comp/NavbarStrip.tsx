import React from 'react'
import Link from 'next/link'
import { Merchant } from '@/services/dataTypes'
import { discardHTMLTags, getMerchantHref, splitHeadingFromDetails } from '@/constants/hooks'

interface NavbarStripProps {
  headerPromoMerchant: Merchant[] | null
  companyDomain: string
  mer_slug: string
  mer_slug_type: string
}

const NavbarStrip = ({ headerPromoMerchant, companyDomain, mer_slug, mer_slug_type }: NavbarStripProps) => {
  if (!headerPromoMerchant || headerPromoMerchant.length === 0) {
    return null
  }

  return (
    <div className="bg-slate-900 py-2 border-b border-white/5">
      <div className="container mx-auto">
        {/* Scrollable Container for Mobile, Centered for Desktop */}
        <div className="flex items-center overflow-x-auto no-scrollbar scroll-smooth px-4 lg:justify-center">
          <div className="flex items-center flex-nowrap shrink-0 gap-2">
            {headerPromoMerchant.slice(0, 4).map((item, i) => {
              let [heading] = splitHeadingFromDetails(discardHTMLTags(item?.merchant_detail || ''))
              if (item?.promotional_tag) heading = item?.promotional_tag

              return (
                <React.Fragment key={item.id}>
                  <Link
                    href={getMerchantHref(item, mer_slug, mer_slug_type)}
                    className="text-white text-[11px] md:text-sm font-medium hover:text-indigo-400 transition-colors whitespace-nowrap px-3 py-1 bg-white/5 rounded-full lg:bg-transparent lg:px-4"
                  >
                    {heading || item?.merchant_name}
                  </Link>

                  {/* Divider - Hidden on Mobile, Visible on Desktop */}
                  {i < headerPromoMerchant.slice(0, 4).length - 1 && (
                    <div className="hidden lg:block h-3 w-px bg-white/20" />
                  )}
                </React.Fragment>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavbarStrip