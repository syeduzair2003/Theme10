import cookieService from "@/services/CookiesService";
import { apiGetMetaData, apiTemplate } from "@/apis/user";
import P1 from "@theme1/Pages/Other/page";
import P2 from "@theme2/Pages/Other/page";
import P3 from "@theme3/Pages/Other/page";
import P4 from "@theme4/Pages/Other/page";
import P5 from "@theme5/Pages/Other/page";
import P6 from "@theme6/Pages/Other/page";
import P8 from "@theme8/Pages/Other/page";
import P10 from "@theme10/Pages/Other/page";
import { Metadata } from "next";
import { discardHTMLTags, getBaseImageUrl } from "@/constants/hooks";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<any>;
};
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const companyDomain = await cookieService.get("domain");

  const { slug } = await params;
  const meta = (
    await apiGetMetaData(JSON.stringify(slug), companyDomain.domain)
  ).data;
  const twitterHandle = `@${meta?.company_data?.company_name.replace(/\s+/g, "")}`;
  let canonicalData = `https://${companyDomain.domain}`;
  // const companyLogo = getBaseImageUrl(companyDomain.domain, meta?.company_data?.site_icon, "/themes/Theme_3/images/logo.png");
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
  let ogImage = companyLogo;

  if (slug.length === 1 && slug[0] === meta?.company_data?.store_slug) {
    canonicalData += `/${slug[0]}`;
  }
  // else if (slug.length === 1 && slug[0] === 'events') {
  //   canonicalData += `/${slug[0]}`;
  // } else if (slug.length === 1 && slug[0] === meta?.company_data?.category_slug) {
  //   canonicalData += `/${slug[0]}`;
  // }
  else if (slug.length === 2 && slug[0] === meta?.company_data?.store_slug) {
    canonicalData += `/${slug[0]}/${slug[1]}`;
    ogImage = meta?.og_image
      ? getBaseImageUrl(companyDomain.domain, meta?.og_image, companyLogo)
      : companyLogo;
  } else if (
    slug.length === 2 &&
    slug[0] === meta?.company_data?.promotion_slug
  ) {
    canonicalData += `/${slug[0]}/${slug[1]}`;
    ogImage = meta?.og_image
      ? getBaseImageUrl(companyDomain.domain, meta?.og_image, companyLogo)
      : companyLogo;
    if (slug[1] === "christmas-holiday-deals") {
      ogImage = getBaseImageUrl(
        companyDomain.domain,
        "/shared-assets/promotion/christmas-holiday-deals.png",
        "",
      );
    }
  }
  // else if (slug.length === 2 && slug[0] === meta?.company_data?.category_slug) {
  //   canonicalData += `/${slug[0]}/${slug[1]}`;
  // }
  else if (slug.length === 2 && slug[0] === "all-stores") {
    canonicalData += `/${slug[0]}/${slug[1]}`;
    // } else if (slug.length === 2 && slug[0] === "events") {
    //   canonicalData += `/${slug[0]}/${slug[1]}`;
  }

  return {
    title: meta?.meta_title,
    description: discardHTMLTags(meta?.meta_description),
    keywords: meta?.meta_keywords,
    alternates: {
      canonical: `${canonicalData}`,
    },
    icons: [
      { rel: "icon", url: companyIcon, sizes: "48x48", type: "image/png" },
    ],
    openGraph: {
      title: meta?.og_title ?? meta?.meta_title,
      description:
        discardHTMLTags(meta?.twitter_description) ??
        discardHTMLTags(meta?.meta_description),
      images: [
        {
          url: ogImage,
          width: 1200, // ✅ Standard OG image width
          height: 630, // ✅ Standard OG image height
          alt: meta?.og_title || meta?.meta_title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta?.twitter_title || meta?.meta_title,
      description:
        discardHTMLTags(meta?.twitter_description) ||
        discardHTMLTags(meta?.meta_description),
      site: twitterHandle,
      creator: twitterHandle,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: meta?.twitter_title || meta?.meta_title,
        },
      ],
    },
  };
}

const Dynamic = async ({ params, searchParams }: PageProps) => {
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
  return <SelectedPage params={params} searchParams={searchParams} />;
};

export default Dynamic;
