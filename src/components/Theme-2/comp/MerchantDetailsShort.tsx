import { cleanHtmlContent, extractFirstSentences } from "@/constants/hooks";
import Link from "next/link";
import React from "react";
import { stripHtml } from "string-strip-html";

interface Props {
    details: string | null;
}

const MerchantDetailsShort = ({ details }: Props) => {
    if (!details) return null;

    const cleanText = cleanHtmlContent(details || "");
    const plainText = stripHtml(cleanText).result;
    const shortSentence = extractFirstSentences(plainText);

    const hasMoreContent = plainText.length > (shortSentence.length + 5);

    return (
        <div className="promotion-details-card">
            <h3 className="h6 fw-semibold mb-2">Quick Info</h3>
            <p className="text-muted mb-0">{shortSentence}</p>
            {hasMoreContent && (
            <div className="mt-2">
                <Link href="#fullDetails" className="merchant-see-more-link">
                    See Full Details
                </Link>
            </div>
            )}
        </div>
    );
};

export default MerchantDetailsShort;
