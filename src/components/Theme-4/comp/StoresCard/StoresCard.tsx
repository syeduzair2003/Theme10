import Image from "next/image";
import "./storescard.css";
import Link from "next/link";
import { getMerchantHref,discardHTMLTags,getRandomStoreSeoTitle,getBaseImageUrl,splitHeadingFromDetails } from "@/constants/hooks";
import { CompanyWiseMerchant, Merchant } from "@/services/dataTypes";
import cookieService from "@/services/CookiesService";

interface Props {
  // slug: string;
  mer_slug: string;
  mer_slug_type: string;
  // merchant_logo: string;
  // merchant_name: string;
  merchant: Merchant | CompanyWiseMerchant;
  className?: string;
}

const StoresCard = async ({ merchant,mer_slug,mer_slug_type }: Props) => {
  const companyDomain = await cookieService.get("domain");
  const [heading, details] = splitHeadingFromDetails(merchant?.merchant_detail);
  const headingToShow = heading ? discardHTMLTags(heading) : getRandomStoreSeoTitle(merchant?.merchant_name)

  return (
    <div className="
  flex flex-col items-center text-center cursor-pointer
  bg-white rounded-xl w-full max-h-[200px]
  my-[5px] px-3 py-2
  transition-all duration-300
  shadow-[0_2px_6px_grey]
  hover:-translate-y-1 hover:shadow-lg
">
      <Link href={getMerchantHref(merchant, mer_slug, mer_slug_type)} className="stores-link">
        <div className="image-wrapper">
          <Image
            // src={`/${merchant_logo}`}
            src={getBaseImageUrl(companyDomain.domain, merchant.merchant_logo, "")}
            alt={headingToShow}
            fill
            loading="lazy"
            className="stores-image"
          />
        </div>
        {/* <h4 className="merchant-name">{headingToShow}</h4> */}
      </Link>
    </div>
  );
};

export default StoresCard;
