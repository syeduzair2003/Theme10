import { stripHtml } from "string-strip-html";
import { cleanHtmlContent } from '@/constants/hooks';
import React from 'react';
import Link from "next/link";

interface Props {
  details: string | null;
  slug: string | undefined;
  showFull?: boolean;
}

const MerchantDetailsSSR = ({ details, slug, showFull = false }: Props) => {
  if (!details) return null;

  const cleanText = cleanHtmlContent(details || '');
  const plainText = stripHtml(cleanText).result;
  const wordLimit = 40;

  const showToggle = plainText.split(' ').length > wordLimit;
  
  return (
    <div className="merchant-details-wrapper text-jus w-100 mb-4" id={`merchant-details-box-${slug}`}>
      {!showFull ? (
        <div className="text-container">
          <span className="text-content custom-mer-det-css truncate-3-lines d-inline"
            dangerouslySetInnerHTML={{ __html: cleanText }}
          />
          {showToggle && (
            <span className="toggle-button">
              <Link href={`?merchantDetails=1`} id={`show-more-link-${slug}`}>Show more</Link>
            </span>
          )}
        </div>
      ) : (
        <div className="text-container">
          <span
            className="text-content custom-mer-det-css"
            dangerouslySetInnerHTML={{ __html: cleanText }}
          />
          <span className="toggle-button">
            <Link href={`?merchantDetails=0`} id={`show-less-link-${slug}`}>Show less</Link>
          </span>
        </div>
      )}
    </div>
  );
};

export default MerchantDetailsSSR;