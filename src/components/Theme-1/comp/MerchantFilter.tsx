import React from "react";
import { Merchant } from "@/services/dataTypes";
import Link from "next/link";
import { getRandomStoreSeoTitle } from "@/constants/hooks";

const MerchantFilter = ({ merchant, mer_slug_type, mer_slug }:
  { merchant: Merchant[], mer_slug_type: string, mer_slug: string }) => {

  const groupedMerchants = merchant.reduce((acc: Record<string, Merchant[]>, item) => {
    const firstChar = item.merchant_name.charAt(0).toUpperCase();
    const groupKey = /^[A-Z]$/.test(firstChar) ? firstChar : "#"; // Group by letter or # for non-alphabetic
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(item);
    return acc;
  }, {});

  const getHref = (item: Merchant) => `/${mer_slug}/${item[mer_slug_type as keyof Merchant] || item.slug}`;

  return (
    <div className="dashboard-body__content filter-body m-0" style={{
      height: "fit-content",
      padding: "10px",
      borderRadius: "8px",
      backgroundColor: "white",
    }}>
      <div className="row gy-4 p-4">
        <div className="col-lg-12">
          <div className="">
            <div className="card-body">
              <ul className="breadcrumb-list flx-align gap-2 pb-4">
                <li className="breadcrumb-list__item font-14 text-body">
                  <Link
                    href="/"
                    className="breadcrumb-list__link text-body hover-text-main"
                  >
                    Home
                  </Link>
                </li>
                <li className="breadcrumb-list__item font-14 text-body">
                  <span className="breadcrumb-list__icon font-10">
                    <i className="fas fa-chevron-right" />
                  </span>
                </li>
                <li className="breadcrumb-list__item font-14 text-body">
                  <span className="breadcrumb-list__text text-capitalize">{mer_slug}</span>
                </li>
              </ul>
              <div className="statement-item__header d-flex align-self-center"
                style={{ marginTop: -10 }}>
                <h2 className="statement-item__title my-auto mb-4 f-30">Browse Merchants</h2>
              </div>
              {Object.keys(groupedMerchants)
                .sort((a, b) => (a === "#" ? -1 : b === "#" ? 1 : a.localeCompare(b))) // Sort alphabetically, but keep # at the top
                .map((group) => (
                  <div key={group} style={{ marginBottom: "20px" }}>
                    <h6 className="statement-item__subtitle mx-2">{group}</h6> {/* Letter or # Header */}
                    <hr className="store-hr" style={{ marginTop: -15 }} />
                    <ul
                      className="mb-0"
                      style={{
                        display: "inline-flex",
                        gap: "10px 20px",
                        listStyle: "none",
                        flexWrap: "wrap",
                      }}
                    >
                      {groupedMerchants[group].map((item: Merchant, i: number) => {
                        const href = getHref(item);
                        return (
                          <Link
                            key={item.unique_id}
                            href={href}
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <li style={{ margin: "0 10px", }} className="custom-filter-item px-3 py-2 pill">
                              <span className="font-15">{getRandomStoreSeoTitle(item?.merchant_name)}</span>
                            </li>
                          </Link>
                        )
                      })}
                    </ul>
                    <hr className="store-hr" />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantFilter;
