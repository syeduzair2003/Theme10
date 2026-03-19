import { Merchant } from '@/services/dataTypes';
import Image from 'next/image';
import Link from 'next/link';
import {
  discardHTMLTags,
  getBaseImageUrl,
  getMerchantHref,
  splitHeadingFromDetails
} from '@/constants/hooks';
import cookieService from '@/services/CookiesService';

interface Props {
  merchant: Merchant;
  mer_slug: string;
  slug_type: string;
  preloadedImage: string;
}

const NewPopularMerchantCard = async ({
  merchant,
  mer_slug,
  slug_type,
  preloadedImage
}: Props) => {

  const domain = (await cookieService.get("domain")).domain;
  const [heading] = splitHeadingFromDetails(merchant?.merchant_detail);

  const title = heading
    ? discardHTMLTags(heading)
    : merchant?.merchant_name;

  const href = getMerchantHref(merchant, mer_slug, slug_type);

  return (
    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-4">
      <div className="popular-card text-center h-100">

        {/* IMAGE */}
        <div className="popular-card-media">
          <Link href={href}>
            <Image
              src={getBaseImageUrl(domain, preloadedImage, "")}
              alt={title}
              width={400}
              height={400}
              className="popular-card-img"
            />
          </Link>
        </div>

        {/* TITLE */}
        <div className="popular-card-info">
          <h4 className="popular-card-title">
            <Link href={href}>
              {title}
            </Link>
          </h4>
        </div>

      </div>
    </div>
  );
};

export default NewPopularMerchantCard;
