import { cleanHtmlContent } from "@/constants/hooks";
import React from "react";

interface Props {
  details: string | null;
}

const MerchantDetailsFull = ({ details }: Props) => {
  if (!details) return null;

  const cleanText = cleanHtmlContent(details || "");
  return (
    <div className="merchant-details-full border rounded-3 p-4 bg-white shadow-sm" id="fullDetails">
      <div
        className="modal-html-content text-secondary lh-lg"
        dangerouslySetInnerHTML={{ __html: cleanText }}
      />
    </div>
  );
};

export default MerchantDetailsFull;
