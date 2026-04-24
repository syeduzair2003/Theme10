import cookieService from "@/services/CookiesService";
import { apiGetMetaData, apiTemplate } from "@/apis/user";
import P1 from '@theme1/Pages/Category/[...slug]/page'
import P2 from '@theme2/Pages/Category/[...slug]/page'
import P3 from '@theme3/Pages/category/[...slug]/page'
import P4 from '@theme4/Pages/category/[...slug]/page'
import P5 from '@theme5/Pages/category/[...slug]/page'
import P6 from '@theme6/Pages/category/[...slug]/page'
import P8 from '@theme8/Pages/category/[...slug]/page'
import P9 from '@theme9/Pages/category/[...slug]/page'
import { Metadata } from "next";
import { getBaseImageUrl } from "@/constants/hooks";

export const dynamic = "force-dynamic";

type PageProps = {
    params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
    const companyDomain = await cookieService.get("domain");
    const { slug } = await params;

    // ✅ Pagination logic
    let page = 1;

    const isPaginated =
    slug.length >= 2 && slug[slug.length - 2] === "page";

    if (isPaginated) {
    page = parseInt(slug[slug.length - 1], 10) || 1;
    }

    let cleanSlugParts: string[];

    if (isPaginated) {
    
    cleanSlugParts = [slug[slug.length - 3]];
    } else {
    cleanSlugParts = slug;
    }
    const categorySlug = slug
    .slice(0, isPaginated ? -2 : undefined)
    .join("/");

    const metaSlug = ["category", ...cleanSlugParts];
    const formattedData = `[${metaSlug.map(s => `'${s}'`).join(",")}]`;

    // ✅ Fetch meta for the *clean category slug* (without /page/x)
    const meta = (
        await apiGetMetaData(formattedData, companyDomain.domain)
    ).data;
    const twitterHandle = `@${meta?.company_data?.company_name.replace(/\s+/g, "")}`;

    // ✅ Canonical base
    const baseUrl = `https://${companyDomain.domain}/category/${categorySlug}`;

    // ✅ Meta Title/Description adjustment for paginated pages
    const metaTitle =
        page > 1 ? `${meta?.meta_title} | Page ${page}` : meta?.meta_title;
    const metaDescription =
        page > 1 ? `${meta?.meta_description} | Page ${page}` : meta?.meta_description;

    const companyIcon = getBaseImageUrl(companyDomain.domain, meta?.company_data?.site_icon, "/themes/Theme_3/images/logo.png");
    const companyLogo = getBaseImageUrl(companyDomain.domain, meta?.company_data?.company_logo, "/themes/Theme_3/images/logo.png");

    const totalPages = meta?.pagination?.last_page;

    const alternates: any = {
        canonical: isPaginated ? `${baseUrl}/page/${page}` : baseUrl,
    };
    if (page > 1) {
        alternates.prev = page === 2 ? baseUrl : `${baseUrl}/page/${page - 1}`;
    }
    if (page < totalPages) {
        alternates.next = `${baseUrl}/page/${page + 1}`;
    }

    const prevLink = page > 1 ? (page === 2 ? baseUrl : `${baseUrl}/page/${page - 1}`) : null;
    const nextLink = page < totalPages ? `${baseUrl}/page/${page + 1}` : null;

    return {
        title: metaTitle,
        description: metaDescription,
        keywords: meta?.meta_keywords,
        alternates: {
            canonical: page === 1 ? baseUrl : `${baseUrl}/page/${page}`,
        },
        pagination: {
            previous: prevLink,
            next: nextLink,
        },
        icons: [
            {rel: 'icon', url: companyIcon, sizes:'48x48', type:'image/png'}
        ],
        openGraph: {
            title: meta?.og_title ?? meta?.meta_title,
            description: meta?.twitter_description ?? meta?.meta_description,
            images: [
                {
                    url: meta?.merchant_logo
                        ? getBaseImageUrl(companyDomain.domain, meta?.merchant_logo, companyLogo)
                        : companyLogo,
                    width: 1200,   // ✅ Standard OG image width
                    height: 630,   // ✅ Standard OG image height
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
                    url: meta?.merchant_logo
                        ? getBaseImageUrl(companyDomain.domain, meta?.merchant_logo, companyLogo)
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
            case 'theme 1': return P1;
            case 'theme 2': return P2;
            case "theme 3":
                return P3;
            case "theme 4":
                return P4;
            case 'theme 5':
                return P5;
            case 'theme 6':
                return P6;
            case 'theme 8':
                return P8;    
            case 'theme 9':
                return P9;    
            default:
                return P3;
        }
    };

    const SelectedPage = selector("theme 9");
    return <SelectedPage params={params} />
};

export default Dynamic;
