import cookieService from "@/services/CookiesService";
import { apiGetMetaData, apiTemplate } from "@/apis/user";
import P1 from "@theme1/Pages/Products/[...slug]/page";
import P2 from "@theme2/Pages/Products/[...slug]/page";
import P3 from "@theme3/Pages/Products/[...slug]/page";
import P4 from "@theme4/Pages/All-Products/[...slug]/page";
import P5 from "@theme5/Pages/Products/[...slug]/page";
import P6 from "@theme6/Pages/Products/[...slug]/page";
import P8 from "@theme8/Pages/All-Products/[...slug]/page";
import P10 from "@theme10/Pages/Products/[...slug]/page";
import { Metadata } from "next";
import { extractTrailingId, getBaseImageUrl } from "@/constants/hooks";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

const removeTrailingIdFromSlug = (value: string): string | null => {
  if (!value) return null;

  const parts = value.split("-").filter(Boolean);

  // If there is only one segment, nothing to remove
  if (parts.length <= 1) return value;

  // Remove last segment (unique ID)
  parts.pop();

  return parts.join("-");
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const companyDomain = await cookieService.get("domain");

  const { slug } = await params;
  let meta;

  if (slug.length === 3) {
    // /products/merchant/category/offer-detail
    const formattedData = JSON.stringify([
      "specific-product",
      removeTrailingIdFromSlug(slug[2]),
    ]);
    meta = (await apiGetMetaData(formattedData, companyDomain.domain)).data;
  } else if (slug.length === 2) {
    const productId = extractTrailingId(slug[1]);

    if (productId) {
      // /products/merchant/offer-detail (no category in URL)
      const formattedData = JSON.stringify([
        "specific-product",
        removeTrailingIdFromSlug(slug[1]),
      ]);
      meta = (await apiGetMetaData(formattedData, companyDomain.domain)).data;
    } else {
      // /products/merchant/category
      const formattedData = JSON.stringify([
        "brand-category-product-page",
        slug[1],
        slug[0],
      ]);
      meta = (await apiGetMetaData(formattedData, companyDomain.domain)).data;
    }
  } else if (slug.length === 1) {
    // /products/merchant
    const formattedData = JSON.stringify(["brand-product-page", slug[0]]);
    meta = (await apiGetMetaData(formattedData, companyDomain.domain)).data;
  }

  const twitterHandle = `@${meta?.company_data?.company_name.replace(/\s+/g, "")}`;

  const companyIcon = getBaseImageUrl(
    companyDomain.domain,
    meta?.company_data?.site_icon,
    "/themes/Theme_3/images/logo.png",
  );
  const companyLogo = getBaseImageUrl(
    companyDomain.domain,
    meta?.company_data?.company_logo,
    "/themes/Theme_3/images/logo.png",
  );
  let canonicalUrl = `https://${companyDomain.domain}/products/`;

  if (slug?.length === 1) {
    canonicalUrl += slug[0];
  } else if (slug?.length > 1) {
    canonicalUrl += slug.join("/");
  }

  return {
    title: meta?.meta_title,
    description: meta?.meta_description,
    keywords: meta?.meta_keywords,
    icons: [
      { rel: "icon", url: companyIcon, sizes: "48x48", type: "image/png" },
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: meta?.og_title ?? meta?.meta_title,
      description: meta?.twitter_description ?? meta?.meta_description,
      images: [
        {
          url: meta?.og_image
            ? getBaseImageUrl(companyDomain.domain, meta?.og_image, companyLogo)
            : companyLogo,
          width: 1200, // ✅ Standard OG image width
          height: 630, // ✅ Standard OG image height
          alt: meta?.og_title || meta?.meta_title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta?.twitter_title || meta?.meta_title,
      description: meta?.twitter_description || meta?.meta_description,
      site: twitterHandle,
      creator: twitterHandle,
      images: [
        {
          url: meta?.og_image
            ? getBaseImageUrl(companyDomain.domain, meta?.og_image, companyLogo)
            : companyLogo,
          width: 1200,
          height: 630,
          alt: meta?.twitter_title || meta?.meta_title,
        },
      ],
    },
  };
}

const Dynamic = async ({ params }: PageProps) => {
  const companyDomain = await cookieService.get("domain");
  const template = (await apiTemplate(companyDomain.domain)).data;

  const selector = (theme: string): any => {
    switch (theme?.trim()?.toLowerCase()) {
      case "theme 1":
        return P1;
      case "theme 2":
        return P2;
      case "theme 3":
        return P3;
      case "theme 4":
        return P4;
      case "theme 5":
        return P5;
      case "theme 6":
        return P6;
      case "theme 8":
        return P8;
      case "theme 10":
        return P10;
      default:
        return P3;
    }
  };

  const SelectedPage = selector("theme 10");
  return <SelectedPage params={params} />;
};

export default Dynamic;
