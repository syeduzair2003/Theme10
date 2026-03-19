"use client"
import Image from "next/image";
import { Offer, OffersOffer } from "@/services/dataTypes";
import { useEffect, useState } from "react";
import OfferPopOver from "./OfferPopOver";
import { getMerchantHref, getRandomRating } from "@/constants/hooks";
import OfferOutUrl from "@/components/shared/OfferOutUrl";
import RenderRating from "./RenderRating";
// import Image from '@/components/shared/Image';

interface Props {
  product: OffersOffer;
  companyId: string;
  product_details: null | Offer;
  slug_type: string;
  mer_slug: string;
  domain: string;
}

let renderCount = 0;
const AllProductListView = ({ product, companyId, product_details, mer_slug, slug_type, domain }: Props) => {
  const [p_data, setP_data] = useState<Offer | null>(product_details);
  const [showModal, setShowModal] = useState(false);
  const [lazy, setLazy] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLazy(true), 400); // 0.4 seconds
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (product_details && renderCount === 0) {
      setP_data(product_details);
      setShowModal(true);
      renderCount += 1;
    }
  }, [product_details]);

  const rating = getRandomRating(product?.offer?.rating)

  return (
    <>
      {showModal && (product_details != null || product_details != undefined) && (
        <OfferPopOver
          data={p_data}
          companyId={companyId}
          onClose={() => setShowModal(false)}
          domain={domain}
        />
      )}
      <div className="col-xl-12 col-sm-12">
        <div className="product-item product-item-coupon sidebar-bg product-item-coupon-custom-color">
          <div className="row">
            <div className="col-xl-3 col-sm-3">
              <div className="product-item__thumb d-flex align-content-center justify-content-center h-100 w-100">
                <OfferOutUrl outUrl={product?.offer?.url} merchantHref={getMerchantHref(product.merchant, mer_slug, slug_type)} unique_id={product?.offer?.unique_id} customClass="link w-100" domain={domain}>
                  <Image
                    src={'/shared-assets/sale-image.png'}
                    width={130}
                    height={0}
                    alt={`${product.merchant.merchant_name} deals and coupons`}
                    className="cover-img"
                  />
                </OfferOutUrl>
              </div>
            </div>
            <div className="col-xl-6 col-sm-6">
              <div className="product-item__content">
                <div className="product-item__container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h5 className="product-item__title" style={{ margin: 0, flex: 1 }}>
                    <OfferOutUrl outUrl={product?.offer?.url} merchantHref={getMerchantHref(product.merchant, mer_slug, slug_type)} unique_id={product?.offer?.unique_id} customClass="link" domain={domain}>
                      {product?.offer?.offer_title}
                    </OfferOutUrl>
                  </h5>
                </div>
                <div className="product-item__bottom flx-between gap-2">
                  <div className="d-flex align-items-center gap-1">
                    <span className="product-item__prevPrice">
                      {product?.offer?.end_date == null ? 'Lifetime' : `Expire at ${product?.offer?.end_date}`}
                    </span>
                  </div>
                  <div className="product-review__rating flx-align mt-2">
                    {/* <RenderRating rating={rating} />
                    <span className='f-14'>({rating})</span> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-3 d-flex align-items-center justify-content-center">
              <div className="custom-btn-dark">
                <OfferOutUrl outUrl={product?.offer?.url} merchantHref={getMerchantHref(product.merchant, mer_slug, slug_type)} unique_id={product?.offer?.unique_id} customClass="" domain={domain}>
                  {product?.offer?.offer_type.name.includes('Coupon') ? 'Show Code' : 'Get Deal'}
                </OfferOutUrl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProductListView;
