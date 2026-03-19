'use client'

import { CompanySlider } from '@/services/dataTypes'
import { useEffect, useState } from 'react'
import { getBaseImageUrl } from '@/constants/hooks'
import ClientSlider from './ClientSlider'

interface Props {
  companySliders: CompanySlider[]
  domain: string
}

const SliderWrapper = ({ companySliders, domain }: Props) => {
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => setHydrated(true), [])

  if (!companySliders?.length) return null

  return (
    <div className="slider-hydration-wrapper" style={{ position: 'relative', maxWidth: "100%" }}>
      <div
        className="hydrated-slider"
        style={{ opacity: hydrated ? 1 : 0, transition: 'opacity 0.3s ease' }}
      >
        <ClientSlider sliders={companySliders} domain={domain} />
      </div>
    </div>
  )
}

export default SliderWrapper
