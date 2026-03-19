'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { getBaseImageUrl, getCategoryHref, getEventsHref, getMerchantHref } from '@/constants/hooks';

const HOVER_DELAY = 500; // in milliseconds

type Props = {
  companyDomain: string;
  categories: any[];
  merchantData: any[];
  events: any[];
  cat_slug: string;
  mer_slug: string;
  mer_slug_type: string;
};

export default function DropdownMenu({
  companyDomain,
  categories,
  merchantData,
  events,
  cat_slug,
  mer_slug,
  mer_slug_type
}: Props) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (menu: string) => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => {
      setActiveMenu(null);
    }, HOVER_DELAY);
  };

  const renderMenuItem = (
    label: string,
    href: string,
    menuKey: string,
    content: React.ReactNode
  ) => (
    <li
      className="menu-item position-relative"
      onMouseEnter={() => handleMouseEnter(menuKey)}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={href} className="d-flex align-items-center justify-content-center">
        {label}
        <FontAwesomeIcon
          icon={faChevronDown}
          style={{ width: '12px', height: '12px', color: 'black' }}
          className="custom-icon-upd ms-1"
        />
      </Link>
      <ul
        className={`sub-menu p-lg-5 position-cus-right ${
          (menuKey === 'stores' && merchantData.length >= 10) || (menuKey === 'events' && events.length >= 10)
            ? 'multi-column'
            : ''
        } ${activeMenu === menuKey ? 'd-block' : 'd-none'}`}
      >
        {content}
      </ul>
    </li>
  );

  return (
    <>
      {renderMenuItem(
        'Categories',
        `/${cat_slug}`,
        'categories',
        categories.length > 0 ? (
          categories.map((item, i) => (
            <li key={i} className="menu-link py-2 d-flex gap-2 cat-nav">
              <Link href={getCategoryHref(item, cat_slug, mer_slug_type)} className='d-flex gap-2'>
                <Image
                  src={getBaseImageUrl(companyDomain, item?.category_image, '')}
                  alt={item?.name}
                  height={25}
                  width={25}
                />
                <span className="slide-horizontal fw-bold" data-splitting>
                  {item.name}
                </span>
              </Link>
            </li>
          ))
        ) : (
          <li className="menu-link py-1">
            <p className="n2-color slide-horizontal" data-splitting>
              No categories available
            </p>
          </li>
        )
      )}

      {renderMenuItem(
        'Stores',
        `/all-stores/A`,
        'stores',
        merchantData.length > 0 ? (
          merchantData.map((item, i) => (
            <li key={i} className="menu-link py-2 cat-nav h-100 flex-row gap-3">
              <Link
                className="d-flex justify-center align-items-center gap-3"
                href={getMerchantHref(item, mer_slug, mer_slug_type)}
              >
                <span className="mer-nav-img-wrapper">
                  <Image
                    src={getBaseImageUrl(companyDomain, item?.merchant_logo, '')}
                    alt={item?.merchant_name}
                    height={100}
                    width={100}
                  />
                </span>
                <span className="slide- fw-bold" data-splitting>
                  {item.merchant_name}
                </span>
              </Link>
            </li>
          ))
        ) : (
          <p className="n2-color slide-horizontal" data-splitting>
            No stores available
          </p>
        )
      )}

      {events?.length > 0 &&
        renderMenuItem(
          'Events',
          `/events`,
          'events',
          events.map((item, i) => (
            <li key={i} className="menu-link py-1">
              <Link href={getEventsHref(item, mer_slug_type)} className="slide-horizontal fw-bold" data-splitting>
                {item.name}
              </Link>
            </li>
          ))
        )}
    </>
  );
}
