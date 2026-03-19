import { Offer, offerBannerMinimalData, OffersOffer, Widget } from "@/services/dataTypes";
import { decode } from 'html-entities';

export const rantingHandler = (value: string | number | null | undefined): boolean[] => {
  if (!value || isNaN(Number(value)) || Number(value) < 0 || Number(value) > 5) {
    return [false];
  }
  const rate = Number(value);
  const toReturn: boolean[] = []
  Array.from({ length: 5 }, (_, i) => {
    const isRated = i + 1 <= rate;
    toReturn.push(isRated);
  });
  return toReturn;
};

export const getMerchantHref = <T>(store: T, mer_slug: string, slug_type: string): string => `/${mer_slug}/${store[slug_type as keyof T] || (store as any).slug}`;
export const getCategoryHref = <T>(category: T, cat_slug: string, slug_type: string): string => `/${cat_slug}/${category[slug_type as keyof T] || (category as any).slug}`;
export const getEventsHref = <T>(event: T, slug_type: string): string => `/events/${event[slug_type as keyof T] || (event as any).slug}`;
// export const getPromotionHref = <T>(event: T, slug_type: string): string => `/promotion/${event[slug_type as keyof T] || (event as any).slug}`;
export const getPromotionHref = <T>(promo: T, promo_slug: string): string => `/${promo_slug}/${(promo as any).slug}`;
export const getProductMerchantHref = <T>(store: T, slug_type: string): string => `/products/${store[slug_type as keyof T] || (store as any).slug}`;
export const getProductDetailHref = <T>(store: T, slug_type: string, product_slug: string, categorySlug?: string): string => `/products/${store[slug_type as keyof T] || (store as any).slug}/${categorySlug ? `${categorySlug}/` : ''}${product_slug}`;

export const calculateOfferDuration = (expiryDate: string | null): string => {
  if (!expiryDate) return "Life Time";

  const now = new Date();
  const endDate = new Date(expiryDate);
  if (isNaN(endDate.getTime())) return "Invalid date";

  // Get user's timezone
  const userTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Normalize to user's timezone (set to 23:59:59 that day)
  const formatted = new Intl.DateTimeFormat("en-CA", {
    timeZone: userTZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(endDate);
  const endOfDay = new Date(`${formatted}T23:59:59`);

  const diffMs = endOfDay.getTime() - now.getTime();
  if (diffMs <= 0) return "Offer expired";

  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (totalDays === 0) return "Last day";

  if (totalDays < 365) return `${totalDays} day${totalDays !== 1 ? "s" : ""} left`;

  const years = Math.floor(totalDays / 365);
  const days = totalDays % 365;
  return `${years}y${days > 0 ? ` ${days}d` : ""} left`;
};


export const ellipse = (text: string, length: number, w_length?: number): string => {
  const replaced = text.replace(/<\/?p>/g, "");
  const words = replaced.split(/\s+/);
  const w_words = w_length ? w_length : 12;
  const longWord = words.find(word => word.length >= w_words);
  const adjustedLength = longWord ? length - longWord.length : length;
  return replaced.length > adjustedLength
    ? replaced.substring(0, adjustedLength) + "..."
    : replaced;
}
export const Timer = async (time: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (time <= 0) {
      reject(false); // Rejects with false if time is invalid
    } else {
      setTimeout(resolve, 1000 * time);
    }
  });
};

export const discardHTMLTags = (text: string | null): string => {
  if (!text) return "";

  return text
    .replace(/<\/?[^>]+(>|$)/g, "")
    .replace(/&[^;]+;/g, "")
    .replace(/\s+/g, " ")
    .trim();
};

export const getBannerDimensions = (item: any): { width: number, height: number } | null => {
  if (!item?.offer?.banner_size) return null;

  const resolutionParts = item.offer.banner_size.split("x").map(Number);
  if (resolutionParts.length !== 2) return null;

  const [width, height] = resolutionParts;
  return { width, height };
};

export const filterOfferBanners = (banners: any[], minWidth: number, maxWidth: number, minHeight: number, maxHeight: number): any[] => {
  // return banners?.filter(banner => {
  //   const dimensions = getBannerDimensions(banner);
  //   return dimensions && dimensions.width >= minWidth && dimensions.height >= minHeight && dimensions.width <= maxWidth && dimensions.height <= maxHeight;
  // });
  const targetRatio = 1; // Ideal aspect ratio (1:1)

  // Helper to calculate ratio difference from 1:1
  const getRatioDiff = (width: number, height: number) => {
    const ratio = width / height;
    return Math.abs(ratio - targetRatio);
  };

  // Step 1: Filter banners by dimensions
  const filtered = banners?.filter((banner) => {
    const dimensions = getBannerDimensions(banner);
    return (
      dimensions &&
      dimensions.width >= minWidth &&
      dimensions.height >= minHeight &&
      dimensions.width <= maxWidth &&
      dimensions.height <= maxHeight
    );
  });

  // Step 2: Sort by how close their ratio is to 1:1
  const sorted = filtered?.sort((a, b) => {
    const da = getBannerDimensions(a);
    const db = getBannerDimensions(b);
    if (!da || !db) return 0;
    return getRatioDiff(da.width, da.height) - getRatioDiff(db.width, db.height);
  });

  return sorted;
};

export function extractScriptAndNoscript(data: string[]) {
  const scriptContents = {
    srcTagged: [] as string[], 
    inline: [] as string[]     
  };
  const noScriptContents: string[] = [];

  data.forEach((item) => {
    const trimmedItem = item.trim();

    const srcMatch = trimmedItem.match(/<script[^>]*src=["'][^"']+["'][^>]*><\/script>/i);
    if (srcMatch) {
      scriptContents.srcTagged.push(trimmedItem);
      return;
    }

    const inlineMatch = trimmedItem.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
    if (inlineMatch && inlineMatch[1].trim()) {
      scriptContents.inline.push(inlineMatch[1].trim());
    }

    const noScriptMatch = trimmedItem.match(/<noscript[^>]*>([\s\S]*?)<\/noscript>/i);
    if (noScriptMatch && noScriptMatch[1].trim()) {
      noScriptContents.push(noScriptMatch[1].trim());
    }
  });

  return {
    scriptContents,
    noScriptContents,
  };
}

export function extractScriptAndNoscriptHeader(data: string) {
  const scriptMatches = data.match(/<script[^>]*>([\s\S]*?)<\/script>/gi) || [];
  const noScriptMatches = data.match(/<noscript[^>]*>([\s\S]*?)<\/noscript>/gi) || [];

  const scriptContents = scriptMatches.map(script =>
    script.replace(/^<script[^>]*>/i, '').replace(/<\/script>$/i, '').trim()
  );

  const noScriptContents = noScriptMatches.map(noscript =>
    noscript.replace(/^<noscript[^>]*>/i, '').replace(/<\/noscript>$/i, '').trim()
  );

  return {
    scriptContents,
    noScriptContents,
  };
}


export function cleanScriptContent(script: string) {
  return script
    .replace(/^<script[^>]*>/i, '')
    .replace(/<\/script>/i, '')
    .replace(/<noscript[^>]*>[\s\S]*?<\/noscript>/gi, '')
    .trim();
}

export function getBaseImageUrl(domain: string, src: string | null | undefined, fallback: string): string{

  if (src && /^https?:\/\//i.test(src)) {
    return src;
  }

  if (src) {
    return `https://${domain}/${src.replace(/^\/+/, '')}`;
    // return `https://affiliatespublishers.com/storage/${src.replace(/^\/+/, '')}`;
    // return `http://${domain}:3000/${src.replace(/^\/+/, '')}`;
  }

  return fallback ?? '';
}

export function getClientDomain(): string {
  if (typeof window !== 'undefined' && window.location.host) {
    return `https://${window.location.host}`;
  }
  return 'https://default.domain.com';
}

export function getChangeFreq(dateStr?: string | null): string {
  if (!dateStr) return "yearly";

  const updatedDate = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor((+now - +updatedDate) / (1000 * 60 * 60 * 24));

  if (diffDays <= 1) return "daily";
  if (diffDays <= 7) return "weekly";
  if (diffDays <= 30) return "monthly";
  return "yearly";
}

export function getPriority(dateStr?: string | null): string {
  if (!dateStr) return "0.4";

  const updatedDate = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor((+now - +updatedDate) / (1000 * 60 * 60 * 24));

  if (diffDays <= 1) return "1.0";
  if (diffDays <= 7) return "0.8";
  if (diffDays <= 30) return "0.6";
  return "0.5";
}

export function cleanHtmlContent(input: string): string {
  let cleaned = input.replace(/<p>(&nbsp;|\s|&#160;)*<\/p>/gi, '');
  
  cleaned = cleaned.replace(/\s+(<\/?\w)/g, '$1');
  cleaned = decode(cleaned);
  return cleaned;
}

export function splitHeadingFromDetails(html: string | null | undefined): [string, string] {
    if (!html) {
        return ['', ''];
    }
    const h1Regex = /(<h1[\s\S]*?>[\s\S]*?<\/h1>)/i;
    const match = html.match(h1Regex);
    if (!match) {
        return ['', html];
    }
    const heading = match[1];
    const details = html.replace(h1Regex, '').trim();
    return [heading, details];
}

export function getRandomRating(rating?: number | null): number {
  if (!rating || rating === 0) {
    return parseFloat((Math.random() * 1.5 + 3.5).toFixed(1));
  }
  return typeof rating === "number" ? parseFloat(rating.toFixed(1)) : Number(Number(rating).toFixed(1));
}

export function extractOfferCodeFromUrl(url: string): string {
  const regex = /\/out\/O\/([a-fA-F0-9]{32})$/;
  const match = url.match(regex);
  return match ? match[1] : "";
}

type SimplifiedMerchant = {
  id: number;
  unique_id: string;
  slug: string;
};

export function extractAllOffers(data: any): any[] {
  const allOffers: any[] = [];

  data?.merchants?.forEach((merchant: any) => {
    const offers = merchant.offers;

    if (offers && typeof offers === 'object') {
      Object?.values(offers)?.forEach((offer: any) => {
        allOffers.push({
          offer,
          merchant: {
            id: merchant.id,
            unique_id: merchant.unique_id,
            slug: merchant.slug,
          }
        });
      });
    }
  });

  return allOffers;
}

export function extractFirstSentences(text: string, minWordCount: number = 25): string {
  const plainText = text.replace(/<\/?[^>]+(>|$)/g, ""); // Remove HTML tags
  const words = plainText.trim().split(/\s+/);

  if (words.length <= minWordCount) return plainText.trim();

  // Get text starting from the first 25 words
  const initialText = words.slice(0, minWordCount).join(' ');
  const remainingText = words.slice(minWordCount).join(' ');

  // Combine and find the first full stop after the 25th word
  const fullText = `${initialText} ${remainingText}`;
  const match = fullText.match(/^(.+?\.)\s/); // First sentence ending with a full stop

  if (match) {
    return match[1].trim();
  }

  // Fallback: just return first 25 words
  return initialText + '...';
}

export function splitHeading(text: string): [string, string] {
  if (!text) return ['', ''];

  const splitChars = [':', ',', '.', '&'];

  for (const char of splitChars) {
    const index = text.indexOf(char);
    if (index !== -1) {
      // Split at the character (keep the char in first part)
      const firstHalf = text.slice(0, index + 1).trim();
      const secondHalf = text.slice(index + 1).trim();
      return [firstHalf, secondHalf];
    }
  }

  // Fallback: split in half by word count
  const words = text.split(' ');
  const mid = Math.ceil(words.length / 2);
  const firstHalf = words.slice(0, mid).join(' ');
  const secondHalf = words.slice(mid).join(' ');

  return [firstHalf, secondHalf];
}

export function splitOfferTitle(title: string): string[] {
  const cleanTitle = discardHTMLTags(title || '');
  
  // Split by one or more slashes and trim spaces around each item
  return cleanTitle.split(/\/+/).map(word => word.trim());
}

export function getRandomStoreSeoTitle(storeName: string): string {
  const phrases = [
    `${storeName} Coupon Codes & Deals`,
    `${storeName} Discount Offers`,
    `${storeName} Discount Deals`,
    `${storeName} Deals`,
    `${storeName} Promo Codes`,
    `Exclusive ${storeName} Discounts`,
    `${storeName} Sale Events`,
    `Save Big at ${storeName}`,
    `Top ${storeName} Coupons & Promos`,
    `${storeName} Vouchers & Offers`
  ];

  const randomIndex = Math.floor(Math.random() * phrases.length);
  return phrases[randomIndex];
}

export function getRandomCategorySeoTitle(categoryName: string): string {
  const phrases = [
    `${categoryName} Coupons & Deals`,
    `Best ${categoryName} Discounts`,
    `Exclusive ${categoryName} Offers`,
    `${categoryName} Promo Codes`,
    `Save on ${categoryName} Shopping`,
    `Top ${categoryName} Sales`,
    `${categoryName} Voucher Codes`,
    `Discounts on ${categoryName} Products`,
    `Hot ${categoryName} Deals`,
    `${categoryName} Special Offers`
  ];

  const randomIndex = Math.floor(Math.random() * phrases.length);
  return phrases[randomIndex];
}

export function getRandomCategoryCouponsTitle(categoryName: string): string {
  const phrases = [
    `Coupons for all your ${categoryName.toLowerCase()} needs`,
    `Save big on ${categoryName.toLowerCase()} with our coupons`,
    `Exclusive ${categoryName} coupon codes & deals`,
    `Best discounts for ${categoryName.toLowerCase()} lovers`,
    `Unbeatable ${categoryName} coupons & offers`,
    `Top ${categoryName} vouchers to help you save`,
    `Find the best ${categoryName} coupon codes`,
    `Save more on ${categoryName} shopping`,
    `${categoryName} deals you can’t miss`,
    `Your ultimate source for ${categoryName} coupons`
  ];

  const randomIndex = Math.floor(Math.random() * phrases.length);
  return phrases[randomIndex];
}

export function getLastUpdateDate(targetDay: number = 1) {
  // targetDay: 0 = Sunday, 1 = Monday, ..., 5 = Friday
  const today = new Date();
  const day = today.getDay();

  // difference from today → target day
  const diff = (day >= targetDay ? day - targetDay : 7 - (targetDay - day));

  const lastUpdate = new Date(today);
  lastUpdate.setDate(today.getDate() - diff);

  // Format e.g., "August 19, 2025"
  return lastUpdate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getRandomEventSeoTitle(eventName: string): string {
  const phrases = [
    `${eventName} Tickets & Passes`,
    `Best Deals for ${eventName}`,
    `Exclusive ${eventName} Discounts`,
    `${eventName} Promo Codes`,
    `Save on ${eventName} Bookings`,
    `Top ${eventName} Offers`,
    `${eventName} Special Packages`,
    `Discounts on ${eventName} Tickets`,
    `Hot ${eventName} Deals`,
    `${eventName} Event Specials`
  ];

  const randomIndex = Math.floor(Math.random() * phrases.length);
  return phrases[randomIndex];
}

export function getRandomPromotionSeoTitle(promotionName: string): string {
  const phrases = [
    `${promotionName} Promotions & Exclusive Deals`,
    `Latest ${promotionName} Offers You Can’t Miss`,
    `Top ${promotionName} Discounts & Promo Offers`,
    `Best ${promotionName} Promotions for Smart Savings`,
    `${promotionName} Special Offers & Limited-Time Deals`,
    `Trending ${promotionName} Promotions – Save Big Today`,
    `Handpicked ${promotionName} Discounts & Voucher Offers`,
    `Limited-Time ${promotionName} Promotions & Savings`,
    `Verified ${promotionName} Promo Offers for Maximum Value`,
    `${promotionName} Hot Deals, Discounts & Savings`
  ];

  const randomIndex = Math.floor(Math.random() * phrases.length);
  return phrases[randomIndex];
}

const currencySymbols: { [key: string ]: string | null | undefined} = {
  "USD": "$",
  "EUR": "€",
  "GBP": "£",
  "PKR": "₨",
  "INR": "₹",
  "JPY": "¥",
  "CNY": "¥",
  "AUD": "A$",
  "CAD": "C$",
  "DKK": "kr",
  "PLN": "zł",
  "CZK": "Kč",
  "CHF": "CHF",
  "MXN": "MX$"
}

export const getCurrencySymbol = (currency?: string | null): string => {
  if (!currency) return "$";
  return currencySymbols[currency] ? currencySymbols[currency] : "$";
  switch (currency) {
    case "USD": return "$";
    case "EUR": return "€";
    case "GBP": return "£";
    case "PKR": return "₨";
    case "INR": return "₹";
    case "JPY": return "¥";
    case "CNY": return "¥";
    case "AUD": return "A$";
    case "CAD": return "C$";
    case "DKK": return "kr";
    case "PLN": return "zł";
    case "CZK": return "Kč";
    case "CHF": return "CHF";
    case "MXN": return "MX$";
    default: return "$";
  }
};


// utils/generateBreadcrumbs.ts
interface BreadcrumbItem {
  label: string;
  href?: string;
}

export const generateBreadcrumbs = (
  slugPath: string = "",
  basePath: string = "",
  baseLabel: string = ""
): BreadcrumbItem[] => {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
  ];

  // Add base path (like Category, Store, Events)
  if (basePath && baseLabel) {
    breadcrumbs.push({
      label: baseLabel,
      href: basePath,
    });
  }

  // Split slug path (e.g. "accessories/mobile")
  const parts = slugPath
    ?.split("/")
    ?.filter(Boolean);

  parts?.forEach((part, index) => {
    const href = `${basePath}/${parts.slice(0, index + 1).join("/")}`;
    const isLast = index === parts.length - 1;

    breadcrumbs.push(
      isLast
        ? { label: part.replace(/-/g, " ") }
        : { label: part.replace(/-/g, " "), href }
    );
  });

  return breadcrumbs;
};

export function extractDiscountTag(title: string): string | null {
  if (!title) return null;

  const lower = title.toLowerCase();

  // 1️⃣ Match percentage discounts: "5%", "20 %", "15.5%"
  const percentMatch = lower.match(/\b(\d{1,2}(?:\.\d{1,2})?)\s*%/); 
  if (percentMatch) {
    return `${percentMatch[1]}% Off`;
  }

  // 2️⃣ Match flat price discounts: "$22 off", "10 off", "$2.00 Off"
  const offMatch = lower.match(/\$?\b(\d{1,4}(?:\.\d{1,2})?)\s*off\b/);
  if (offMatch) {
    return `$${offMatch[1]} Off`;
  }
  
  return null;
}

export function extractPromoDiscountTag(title: string): string | null {
  if (!title || typeof title !== "string") return null;

  const lower = title.toLowerCase().trim();

  if (
    /\bbuy\s*1\s*get\s*1\s*(free|offer)?\b/.test(lower) ||
    /\bbogo\b/.test(lower)
  ) {
    return "BOGO";
  }

  // Free Gift
  if (/\bfree\s+gift\b/.test(lower)) {
    return "Free Gift";
  }

  // Free Delivery
  if (/\bfree\s+delivery\b/.test(lower)) {
    return "Free Delivery";
  }

  // Free Shipping
  if (/\bfree\s+shipping\b/.test(lower)) {
    return "Free Shipping";
  }

  // Special Offer
  if (/\bspecial\s+offer\b/.test(lower)) {
    return "Special";
  }

  
  const percentMatch = lower.match(/\b([1-9]\d?)\s?%\b/);
  if (percentMatch) {
    return `${percentMatch[1]}% Off`;
  }
  
  const offMatch = lower.match(/\b([1-9]\d?)\s+off\b/);
  if (offMatch) {
    return `${offMatch[1]} Off`;
  }
 
  return null;
}


export function getFinalDiscountTag( title: string, discountPercent: number | null ): string | null {
  // 1️⃣ Prefer actual calculated % discount
  if (discountPercent !== null && discountPercent > 0) {
    const result = `${discountPercent}% Off`
    return result;
  }

  // 2️⃣ Fallback to extracted tag
  return extractDiscountTag(title);
}

export function splitDiscountTag(tag: string | null): {
  discountValue: string | null;
  discountLabel: string | null;
} {
  if (!tag) {
    return { discountValue: null, discountLabel: null };
  }

  // Pattern: "50% Off" or "20 Off"
  const match = tag.match(/^(\d{1,3}%?)\s+(Off)$/i);

  if (!match) {
    return { discountValue: null, discountLabel: null };
  }

  return {
    discountValue: match[1], // "50%" or "20"
    discountLabel: match[2], // always "Off"
  };
}

// export const processOffers = (
//   offers: any,
//   filterType: string | undefined,
//   sortBy: string | undefined
// ) => {
//   let processed = [...offers];
//   console.log("sadhakhdjkahdjkhajkdhajkha", processed)

//   // 1. FILTERING (Coupons vs Deals)
//   if (filterType) {
//     if (filterType === 'code') {
//       processed = processed.filter(item => item?.offer?.offer_type.name.toLowerCase().includes('code') || item?.offer?.offer_type.name.toLowerCase().includes('coupon'));
//     } else if (filterType === 'deal') {
//       processed = processed.filter(item => {
//         const type = item?.offer?.offer_type?.name?.toLowerCase() || "";
//         return !(
//           type.includes("banner") ||
//           type.includes("code") ||
//           type.includes("coupon")
//         );
//       });
//     }
//   }

//   // 2. SORTING
//   if (sortBy) {
//     switch (sortBy) {
//       case 'ending_soon':
//         processed.sort((a, b) => {
//           // Put items with no end date last
//           if (!a.offer?.end_date) return 1;
//           if (!b.offer?.end_date) return -1;
//           return new Date(a.end_date).getTime() - new Date(b.end_date).getTime();
//         });
//         break;

//       case 'recently_updated':
//         processed.sort((a, b) => {
//           if (!a?.offer?.updated_at) return;
//           if (!b?.offer?.updated_at) return;
//           return new Date(b?.offer?.updated_at).getTime() - new Date(a?.offer?.updated_at).getTime();
//         });
//         break;

//       case 'best_discount':
//         // This attempts to extract numbers from strings like "50% Off"
//         const getDiscountVal = (str: string) => {
//           const match = str.match(/(\d+)/);
//           return match ? parseInt(match[0]) : 0;
//         };
//         processed.sort((a, b) =>
//           getDiscountVal(b?.offer?.offer_title) - getDiscountVal(a?.offer?.offer_title)
//         );
//         break;

//       default:
//         break;
//     }
//   }

//   return processed;
// };
export const processOffers = (
  offers: any,
  filterType: string | undefined,
  sortBy: string | undefined
) => {
  let processed = [...offers];
  // 1. FILTERING (Coupons vs Deals)
  if (filterType) {
    const typeLower = filterType.toLowerCase();
    if (typeLower === 'code' || typeLower === 'coupon') {
      processed = processed.filter(item => {
        const coupon = item?.offer?.coupon_code || "";
        return coupon?.trim() !== "";
      });
    } else if (typeLower === "deal") {
      processed = processed.filter(item => {
        const typeName = item?.offer?.offer_type?.name?.toLowerCase() || "";
        const hasCode = item?.offer?.coupon_code?.trim() !== "";

        // Include only NON-code deals
        return !typeName.includes("code") &&
          !typeName.includes("coupon") &&
          !typeName.includes("banner") &&
          hasCode;
      });
    }
  }

  // 2. SORTING
  if (sortBy) {
    switch (sortBy) {
      case 'ending_soon':
        processed.sort((a, b) => {
          const dateA = a?.offer?.end_date ? new Date(a.offer.end_date).getTime() : null;
          const dateB = b?.offer?.end_date ? new Date(b.offer.end_date).getTime() : null;

          // Items without end dates go to the bottom
          if (!dateA) return 1;
          if (!dateB) return -1;

          return dateA - dateB;
        });
        break;

      case 'recently_updated':
        processed.sort((a, b) => {
          const dateA = a?.offer?.updated_at ? new Date(a.offer.updated_at).getTime() : 0;
          const dateB = b?.offer?.updated_at ? new Date(b.offer.updated_at).getTime() : 0;
          return dateB - dateA; // Newest first
        });
        break;

      case 'best_discount':
        const getDiscountVal = (str: string) => {
          if (!str) return 0;
          const match = str.match(/(\d+)/);
          return match ? parseInt(match[0], 10) : 0;
        };
        processed.sort((a, b) => {
          // Check title or name depending on your API structure
          const titleA = a?.offer?.title || a?.offer?.offer_title || "";
          const titleB = b?.offer?.title || b?.offer?.offer_title || "";
          return getDiscountVal(titleB) - getDiscountVal(titleA);
        });
        break;

      default:
        break;
    }
  }

  return processed;
};

export const calculateDiscountPercent = (
  originalPrice?: string | number | null,
  salePrice?: string | number | null
): number | null => {
  const original = Number(originalPrice);
  const sale = Number(salePrice);

  if (!original || !sale || original <= 0 || sale <= 0) {
      return null;
  }

  if (sale >= original) {
      return null;
  }

  return Math.round(((original - sale) / original) * 100);
};

export const parseDiscountTag = (
  tag?: string | null
): {
  value: string;
  middle?: string;
  suffix?: string;
} | null => {
  if (!tag) return null;

  const words = tag.trim().split(/\s+/);

  return {
    value: words[0] || '',
    middle: words[1] || '',
    suffix: words.slice(2).join(' ') || '',
  };
};

export const extractTrailingId = (value: string): string => {
  const parts = value.split('-').filter(Boolean);
  const last = parts.length ? parts[parts.length - 1] : '';
  
  // Unique IDs like "7NeN010218261823" or "FGvg090416250744"
  // Must contain both letters and numbers, and be at least 10 chars
  const isUniqueId = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{10,}$/.test(last);
  
  return isUniqueId ? last : '';
};

export function getMerchantProductsSeo(merchantName: string): string {
  const phrases = [
      `Best ${merchantName} Products & Deals`,
      `Top ${merchantName} Products on Sale`,
      `Shop ${merchantName} Products at the Best Prices`,
      `${merchantName} Product Deals & Discounts`,
      `Latest ${merchantName} Products & Offers`,
      `Buy ${merchantName} Products Online`,
      `${merchantName} Products with Exclusive Discounts`,
      `Popular ${merchantName} Products You’ll Love`,
      `Discover ${merchantName} Products & Savings`,
      `${merchantName} Product Offers Available Now`
  ];

  const randomIndex = Math.floor(Math.random() * phrases.length);
  return phrases[randomIndex];
}

export const splitSentence = (text: string): [string, string] => {
  if (!text) return ["", ""];

  const separators = [" - ", " | ", " : ", " • ", " – ", " — "];

  for (const sep of separators) {
    if (text.includes(sep)) {
      const [first, ...rest] = text.split(sep);
      return [first.trim(), rest.join(sep).trim()];
    }
  }

  // Fallback: split sentence into two halves by words
  const words = text.trim().split(/\s+/);

  if (words.length <= 1) {
    return [text.trim(), ""];
  }

  const mid = Math.ceil(words.length / 2);

  return [
    words.slice(0, mid).join(" "),
    words.slice(mid).join(" "),
  ];
};

export const getOfferType = (offerType: string): string => {
  if (offerType.includes('coupon')) {
    return offerType;
  } else if (offerType.includes('product')) {
    return offerType
  } else {
    return 'Deal'
  }
}