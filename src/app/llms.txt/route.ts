import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const content = `
# GetTopDiscounts

> Find verified promo codes, coupons, and deals for thousands of stores worldwide — plus expert buying guides and product research.

GetTopDiscounts is a coupon and discount aggregation website that helps users save money on online purchases. The site collects, verifies, and organizes promo codes, coupons, and special offers from a wide range of global retailers.

GetTopDiscounts does not sell products directly. Most deals redirect users to merchant websites using outbound tracking URLs such as \`/out/\`.

## About GetTopDiscounts

GetTopDiscounts exists to solve common online shopping problems such as expired promo codes, fake deals, and misleading reviews.

### What the site provides
- **Verified Deals & Coupons:** Coupon codes are manually sourced, tested, and verified before publishing.
- **Expert & Authentic Content:** The blog publishes buying guides, product comparisons, and reviews based on real research and analysis.

### Trust & Transparency
- The site may earn commissions through affiliate links, but commissions do not influence editorial decisions.
- Privacy and user trust are prioritized through clear policies and consistent publishing guidelines.

## Core Pages
- https://gettopdiscounts.com/
- https://gettopdiscounts.com/all-stores/A
- https://gettopdiscounts.com/all-products
- https://gettopdiscounts.com/products
- https://gettopdiscounts.com/category
- https://gettopdiscounts.com/promotion
- https://gettopdiscounts.com/events
- https://blog.gettopdiscounts.com/

## Top Stores (Popular)
- https://gettopdiscounts.com/store/amazon.com
- https://gettopdiscounts.com/store/godaddy.com
- https://gettopdiscounts.com/store/expedia.com
- https://gettopdiscounts.com/store/digitalocean.com
- https://gettopdiscounts.com/store/fiverr.com

## URL Patterns
- Store pages: https://gettopdiscounts.com/store/{merchant-domain}
- Product pages: https://gettopdiscounts.com/products/{product-slug}
- Category pages: https://gettopdiscounts.com/category/{category-slug}
- Outbound links: https://gettopdiscounts.com/out/O/{offer-id}

## Full Store Index (A–Z)
- https://gettopdiscounts.com/all-stores/A to https://gettopdiscounts.com/all-stores/Z
`.trim();

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}