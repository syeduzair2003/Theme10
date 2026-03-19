import { apiCompanyUpdatedData, apiGetCategoryUniqueId } from '@/apis/user';
import AllProductPage from '@/components/Theme-4/comp/AllProductsPage';
import cookieService from '@/services/CookiesService';
import { notFound, redirect } from 'next/navigation';

interface Props {
  params: { slug: string[] };
}

const Page = async ({ params }: Props) => {
  const { slug } = await params;
  const companyDomain = await cookieService.get("domain");
  const c_data = (await apiCompanyUpdatedData(companyDomain))?.data;

  if (slug.length >= 2 && slug[0] === "page" && slug[1] === "1") {
    return redirect("/all-products");
  }

  // ✅ Case: parent category with page/1 → redirect to /all-products/category
  if (slug.length >= 3 && slug[slug.length - 2] === "page" && slug[slug.length - 1] === "1") {
    const cleaned = slug.slice(0, slug.length - 2).join("/");
    return redirect(`/all-products/${cleaned}`);
  }

  // ✅ Case: child category with page/1 → redirect to /all-products/category/child
  if (slug.length === 4 && slug[2] === "page" && slug[3] === "1") {
    const cleaned = slug.slice(0, 2).join("/");
    return redirect(`/all-products/${cleaned}`);
  }
  
  // Case: only "page/[n]"
  if (slug[0] === 'page') {
    return (
      <AllProductPage
        page={slug[1]}
        company_id={c_data?.unique_id}
        storeSlug={c_data?.store_slug}
        slugType={c_data?.slug_type}
        domain={companyDomain?.domain} />
    );
  }

  // Case: child category without page
  if (slug.length === 2) {
    const catRes = await apiGetCategoryUniqueId(slug[1], c_data?.unique_id);
    const categoryId = catRes?.data?.unique_id;
    if (!categoryId) return notFound();

    return (
      <AllProductPage
        company_id={c_data?.unique_id}
        storeSlug={c_data?.store_slug}
        slugType={c_data?.slug_type}
        categoryId={categoryId}
        slug={slug}
        categoryName={catRes?.data?.name} domain={companyDomain?.domain}      />
    );
  }

  // Case: parent category without page
  if (slug.length === 1) {
    const catRes = await apiGetCategoryUniqueId(slug[0], c_data?.unique_id);
    const categoryId = catRes?.data?.unique_id;
    if (!categoryId) return notFound();
    return (
      <AllProductPage
        company_id={c_data?.unique_id}
        storeSlug={c_data?.store_slug}
        slugType={c_data?.slug_type}
        categoryId={categoryId}
        slug={slug}
        categoryName={catRes?.data?.name} domain={companyDomain?.domain}     />
    );
  }

  // Case: parent category with page
  if (slug.length === 3 && slug[1] === 'page') {
    const catRes = await apiGetCategoryUniqueId(slug[0], c_data?.unique_id);
    const categoryId = catRes?.data?.unique_id;
    if (!categoryId) return notFound();

    return (
      <AllProductPage
        page={slug[2]}
        company_id={c_data?.unique_id}
        storeSlug={c_data?.store_slug}
        slugType={c_data?.slug_type}
        categoryId={categoryId}
        slug={slug}
        categoryName={catRes?.data?.name} domain={companyDomain?.domain}     />
    );
  }

  // Case: child category with page
  if (slug.length === 4 && slug[2] === 'page') {
    const catRes = await apiGetCategoryUniqueId(slug[1], c_data?.unique_id);
    const categoryId = catRes?.data?.unique_id;
    if (!categoryId) return notFound();

    return (
      <AllProductPage
        page={slug[3]}
        company_id={c_data?.unique_id}
        storeSlug={c_data?.store_slug}
        slugType={c_data?.slug_type}
        categoryId={categoryId}
        slug={slug}
        categoryName={catRes?.data?.name} domain={companyDomain?.domain}     />
    );
  }
  else if (slug.length > 4) {
    return notFound();
  }
  return notFound();
};

export default Page;
