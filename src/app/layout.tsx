import type { Metadata } from "next";
import "./globals.css";
import "core-js/stable";
import "regenerator-runtime/runtime";
import {
  apiCompanyUpdatedData,
  apiGetMetaData,
  apiGetWidgets,
  apiTemplate,
} from "@/apis/user";
import cookieService from "@/services/CookiesService";
import ThemeSwitcher from "@/components/shared/ThemeSwitcher";
import HeaderScripts from "@/components/shared/HeaderScripts";
import BodyTopScripts from "@/components/shared/BodyTopScripts";
import BodyBottomScripts from "@/components/shared/BodyBottomScripts";
import { getBaseImageUrl } from "@/constants/hooks";
import OrganizationSchema from "@/components/shared/SchemaScripts/OrganizationSchema";
import { headers } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const companyDomain = await cookieService.get("domain");

  const meta = (await apiGetMetaData("null", companyDomain.domain)).data;
  const twitterHandle = `@${meta?.company_data?.company_name.replace(/\s+/g, "")}`;
  const headerWidgets = meta?.company_data?.widgets || [];

  const googleVerificationContent =
    headerWidgets.find((widget) => widget.google_site_verification_content)
      ?.google_site_verification_content ?? null;

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

  return {
    title: meta?.meta_title,
    description: meta?.meta_description,
    keywords: meta?.meta_keywords,
    alternates: {
      canonical: `https://${companyDomain.domain}`,
    },
    verification: {
      google: googleVerificationContent,
    },
    icons: [
      { rel: "icon", url: companyIcon, sizes: "48x48", type: "image/png" },
    ],
    openGraph: {
      title: meta?.og_title ?? meta?.meta_title,
      description: meta?.meta_description,
      images: [
        meta?.merchant_logo
          ? getBaseImageUrl(
              companyDomain.domain,
              meta?.merchant_logo,
              companyLogo,
            )
          : companyLogo,
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta?.twitter_title || meta?.meta_title,
      description: meta?.twitter_description || meta?.meta_description,
      site: twitterHandle,
      creator: twitterHandle,
      images: [
        meta?.merchant_logo
          ? getBaseImageUrl(
              companyDomain.domain,
              meta?.merchant_logo,
              companyLogo,
            )
          : companyLogo,
      ],
    },
  };
}
const themeMap: Record<string, string> = {
  "theme 1": "Theme_1",
  "theme 2": "Theme_2",
  "theme 3": "Theme_3",
  "theme 4": "Theme_4",
  "theme 5": "Theme_5",
  "theme 6": "Theme_6",
  "theme 8": "Theme_8",
  "theme 9": "Theme_9",
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const companyDomain = await cookieService.get("domain");
  const [companyData, template, widgetsData] = await Promise.all([
    apiCompanyUpdatedData(companyDomain).then((res) => res.data),
    apiTemplate(companyDomain.domain).then((res) => res.data),
    apiGetWidgets(companyDomain.domain),
  ]);

  const headersList = headers();
  const fullPath = (await headersList).get("x-pathname") || "/";
  const pathname = fullPath.split("?")[0];

  if (pathname?.includes("/out/O/")) {
    return (
      <html lang="en">
        <body
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#f8f9fa",
            color: "#333",
            textAlign: "center",
          }}
        >
          <div>
            <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
              Redirecting...
            </h1>
            {children}
          </div>
        </body>
      </html>
    );
  }

  // const companyData = (await apiCompanyUpdatedData(companyDomain)).data;
  if (!companyData || companyData.website_is_active == 0) {
    return (
      <html lang="en">
        <body
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#f8f9fa",
            color: "#333",
            textAlign: "center",
          }}
        >
          <div>
            <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
              This site can’t be reached
            </h1>
            <p style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>
              We’re sorry, but the site you’re looking for is currently
              unavailable.
            </p>
          </div>
        </body>
      </html>
    );
  } else {
    const themeName = template?.name?.toLowerCase();
    const selectedThemePath = themeMap[themeName] || "Theme_1";
    const selectedTheme = selectedThemePath?.toLowerCase();
    // const themeCSS = `/themes/${selectedThemePath}/${selectowerCase();edTheme}.css`;
    const themeCSS = `/themes/$theme_9/$theme_9.css`;
    const headerWidgets = widgetsData?.data?.HEADER || [];
    const bodyTopWidgets = widgetsData?.data?.BODY_TOP || [];
    const bodyBottomWidgets = widgetsData?.data?.BODY_BOTTOM || [];

    const socialLinks = {
      facebook: companyData?.facebook,
      twitter: companyData?.twitter,
      instagram: companyData?.instagram,
      linkedin: companyData?.linkedin,
      pinterest: companyData?.pinterest,
      youtube: companyData?.youtube,
      flipboard: companyData?.flipboard,
      tiktok: companyData?.tiktok,
      threads: companyData?.threads,
    };

    return (
      <html lang="en">
        <head>
          <link rel="stylesheet" href={themeCSS} />
          <link
            rel="preconnect"
            href={`https://${companyDomain.domain}`}
            crossOrigin="anonymous"
          />
          <HeaderScripts scripts={headerWidgets} />
          {companyDomain.domain === "gettopdiscounts.com" && (
            <>
              <meta
                name="fo-verify"
                content="79f1bdb3-e89f-4471-b437-ff23bf7bf436"
              />
              <meta
                name="impact-site-verification"
                content="2d8da9ff-b354-490f-835c-b8aa6118ac42"
              />
              <meta
                name="p:domain_verify"
                content="4742214395778362dc116576b80400f1"
              />
              <meta
                name="verification"
                content="7b6f47eae6f1418085035a437fe15c84"
              />
              <meta
                name="verification"
                content="d8489cd0be98463b984368350d8745cd"
              />
            </>
          )}
          {companyDomain.domain === "verifiedlivecoupons.com" && (
            <>
              <meta
                name="verification"
                content="f670540aeb758bc6bbc7ee52295d6d99"
              />
            </>
          )}
        </head>
        <body>
          {companyDomain.domain === "gettopdiscounts.com" && (
            <noscript>
              <iframe
                src="https://www.googletagmanager.com/ns.html?id=GTM-PD85GTM2"
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
              ></iframe>
            </noscript>
          )}
          {companyDomain.domain === "verifiedlivecoupons.com" && (
            <noscript>
              <iframe
                src="https://www.googletagmanager.com/ns.html?id=GTM-TDGSDPCC"
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
              ></iframe>
            </noscript>
          )}
          <BodyTopScripts scripts={bodyTopWidgets} />

          <ThemeSwitcher template={template}>{children}</ThemeSwitcher>

          <BodyBottomScripts scripts={bodyBottomWidgets} />
          <OrganizationSchema
            domain={companyDomain?.domain}
            socialLinks={socialLinks}
            companyLogo={companyData?.company_logo}
            companyName={companyData?.company_name}
            legalName={companyData?.company_legal_name}
            alternateName={companyData?.company_alternate_name}
          />
        </body>
      </html>
    );
  }
}
