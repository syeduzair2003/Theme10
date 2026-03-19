import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getMerchantHref } from '@/constants/hooks'

interface Store {
  id: string
  name: string
  slug: string
  logo: string
  description?: string
  offers_count: number
  rating?: number
}

interface Props {
  store: Store
  merSlug: string
  slugType: string
}

const StoreCardHorizontal: React.FC<Props> = ({ store, merSlug, slugType }) => {
  const merchantHref = getMerchantHref(store, merSlug, slugType)
  return (
    <Link href={merchantHref}>
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
        <div className="flex items-center p-4">
          <div className="w-16 h-16 bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg flex items-center justify-center mr-4">
            <Image
              src={store.logo}
              alt={store.name}
              fill
              className="max-h-12 max-w-12 object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = `https://via.placeholder.com/48x48/8B5CF6/FFFFFF?text=${store.name.charAt(0)}`
              }}
            />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">{store.name}</h3>
            {store.description && (
              <p className="text-sm text-gray-600 mb-2 line-clamp-1">{store.description}</p>
            )}
            <div className="flex items-center justify-between">
              <span className="text-sm text-indigo-600 font-medium">{store.offers_count} offers</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default StoreCardHorizontal