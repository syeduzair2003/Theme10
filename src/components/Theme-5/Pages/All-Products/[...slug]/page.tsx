import React from 'react'
import { notFound, redirect } from 'next/navigation'
import cookieService from '@/services/CookiesService'
import { apiCompanyUpdatedData } from '@/apis/user'
import AllProductLayout from '../../../comp/AllProductsLayout'
import AllProductsSchema from '@/components/shared/SchemaScripts/AllProductSchema'
import Footer from '../../../comp/Footer'

interface Props {
  params: Promise<{ slug: string[] }>
}

const AllProductsSlug = async ({ params }: Props) => {
  const { slug } = await params
  const companyDomain = await cookieService.get("domain")
  const c_data = (await apiCompanyUpdatedData(companyDomain)).data

  if (!slug || slug.length === 0) {
    notFound()
  }

  // Handle pagination
  let page = 1
  const isPaginated = slug.length >= 2 && slug[slug.length - 2] === "page"

  if (isPaginated) {
    page = parseInt(slug[slug.length - 1], 10) || 1
    if (page === 1) {
      const cleanUrl = `/all-products`
      redirect(cleanUrl)
    }
  } else if (slug.length === 2 && slug[0] === "page") {
    page = parseInt(slug[1], 10) || 1
    if (page === 1) {
      redirect('/all-products')
    }
  }

  return (
    <>
      <AllProductLayout
        page={page.toString()}
        companyId={c_data?.unique_id}
        storeSlug={c_data?.store_slug}
        slugType={c_data?.slug_type}
      />
      <Footer />
      <AllProductsSchema company_id={c_data?.unique_id} />
    </>
  )
}

export default AllProductsSlug