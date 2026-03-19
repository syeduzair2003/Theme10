import { stripHtml } from "string-strip-html";
import truncate from 'html-truncate';
import { cleanHtmlContent } from '@/constants/hooks';
import React from 'react';
import MerchantDetailsCSScripts from './MerchantDetailsCSScripts';

interface Props {
  details: string | null;
  slug: string | undefined;
   showFull?: boolean;
}

const MerchantDetailsSSR = ({ details, slug }: Props) => {
  if (!details) return null;

  const cleanText = cleanHtmlContent(details);
  const wordLimit = 10;
  const totalWords = stripHtml(details).result.split(/\s+/).length;
  const showToggle = totalWords > wordLimit;
  const shortText = truncate(details, 100, { keepImageTag: true });
  return (
    <>
      <div className="merchant-details-wrapper text-jus" id={`merchant-details-box-${slug}`}>
        <p className="text-container" id={`collapsed-text-${slug}`}>
          <span
            className="text-content custom-mer-det-css"
            dangerouslySetInnerHTML={{
              __html: showToggle ? `${shortText}` : shortText,
            }}
          />
          {showToggle && (
            <span className="toggle-button">
              <a href="#" id={`show-more-link-${slug}`}>Show more</a>
            </span>
          )}
        </p>

        <p className="text-container" id={`expanded-text-${slug}`} style={{ display: 'none' }}>
          <span
            className="text-content custom-mer-det-css"
            dangerouslySetInnerHTML={{ __html: cleanText }}
          />
          <span className="toggle-button">
            <a href="#" id={`show-less-link-${slug}`}>Show less</a>
          </span>
        </p>
      </div>

      <MerchantDetailsCSScripts slug={slug} />
    </>
  );
};

export default MerchantDetailsSSR;
