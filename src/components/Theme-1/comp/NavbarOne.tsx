import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import CategoryMerchantNav from "./CategoryMerchantNav";
import { getBaseImageUrl, getEventsHref, getMerchantHref, getPromotionHref } from "@/constants/hooks";
import SearchBar from "./SearchBar";
import { categoryMinimalData, EventResponse, minimalMerchantData, Promotion } from "@/services/dataTypes";
import MobileNavbar from "./MobileNavBar";
import MobileNavbarWrapper from "./MobileNavbarWrapper";

interface Props {
  merchantData: minimalMerchantData[],
  categories: categoryMinimalData[] | any,
  promotionalMerchants: minimalMerchantData[] | null | undefined,
  domain: string,
  company_id: string;
  company_logo: string | null;
  blog_title?: string | null;
  blog_url?: string | null;
  cat_slug: string;
  mer_slug_type: string;
  mer_slug: string;
  promo_slug: string,
  events: EventResponse[],
  promotions: Promotion[],
}


const NavbarOne: React.FC<Props> = ({ company_id, company_logo, blog_title, blog_url, cat_slug, mer_slug_type, mer_slug, merchantData, categories, promotionalMerchants, domain, events, promotions, promo_slug }: Props) => {
  // const [active, setActive] = useState(false);
  // const [position, setPosition] = useState<boolean>(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const threshold = window.innerHeight * 0.01;
  //     setPosition(window.scrollY > threshold);
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  // const toggleMobileMenu = () => setActive(!active);
  // const companyLogo = getBaseImageUrl(domain, company_logo, "/themes/Theme_3/images/logo.png");
  const companyLogo = getBaseImageUrl(domain, company_logo, "/uploads/company_5/images/Denix.png");
  // console.log("LOGO SRC ===>", companyLogo);

  return (
    <>
      {/* ==================== Header Start Here ==================== */}
      {/* <header className={'header fixed-header site-header-custom'} style={{ position: `${!position ? "relative" : "fixed"}` }}> */}
      <header className={'header fixed-header site-header-custom'} style={{ color: "#d7fbff !important" }}  >
        <div className={"container"}>
          <nav className="header-inner">
            <div className="row align-items-center justify-content-between">

              {/* Logo Start */}
              <div className="col-lg-2 col-md-3 col-sm-3">
                <div className="logo">
                  <Link href="/" className="link white-version">
                    <Image src={companyLogo} alt="Company Logo" width={150} height={100} />
                  </Link>
                </div>
              </div>
              {/* Logo End */}

              {/* Navigation Menu */}
              <div className="col-lg-8 col-md-7 d-none d-lg-block">
                <ul className="nav-menu flx-align justify-content-center">
                  <li className="nav-menu__item">
                    <Link href="/" className="nav-menu__link">
                      Home
                    </Link>
                  </li>

                  <CategoryMerchantNav
                    categories={categories}
                    companyId={company_id}
                    slug_type={mer_slug_type}
                    cat_slug={cat_slug}
                    merchant_slug={mer_slug}
                    domain={domain}
                  />

                  <li className="nav-menu__item has-submenu">
                    <Link href={`/${mer_slug}`} className="nav-menu__link">
                      Stores
                    </Link>
                    <ul className="nav-submenu" style={{
                      border: "1px solid #F0F0F0",
                      borderRadius: "8px",
                      backgroundColor: "#fff",
                      // transform: 'translateX(-250px)',
                      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                      left: "0",
                      right: "0",
                      // transform: 'translate(-81%, 0)',
                    }}>
                      {merchantData?.length ? merchantData.map((store, i) => (
                        <li key={i} className="nav-menu__item d-flex align-items-center" style={{ borderBottom: "1px solid #f0f0f0", height: "50px" }}>
                          <Image
                            src={getBaseImageUrl(domain, store?.merchant_logo, "")}
                            alt={`${store?.merchant_name} logo`}
                            width={70}
                            height={50}
                            objectFit="cover"
                          />
                          <Link href={getMerchantHref(store, mer_slug, mer_slug_type)} className="nav-submenu__link custom-transition ms-2">
                            {store.merchant_name}
                          </Link>
                        </li>
                      )) : null}
                    </ul>
                  </li>

                  {events?.length > 0 && (
                    <li className="nav-menu__item has-submenu">
                      <Link href={`/events`} className="nav-menu__link">
                        Events
                      </Link>
                      <ul className="nav-submenu" style={{
                        border: "1px solid #F0F0F0",
                        borderRadius: "8px",
                        backgroundColor: "#fff",
                        // transform: 'translateX(-250px)',
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                        left: "0",
                        right: "0",
                        // transform: 'translate(-81%, 0)',
                      }}>
                        {events?.length > 0 ?
                          events.map((item, i) => {
                            return (
                              // <li key={i} className="menu-link py-1">
                              //   <Link href={getEventsHref(item, mer_slug_type)} className="n2-color slide-horizontal" data-splitting>{item.name}</Link>
                              // </li>
                              <Link key={i} href={getEventsHref(item, mer_slug_type)} className="nav-submenu__link custom-transition ms-2">
                                {item.name}
                              </Link>
                            )
                          })
                          :
                          <p className="n2-color slide-horizontal" data-splitting>No Events available</p>
                        }
                      </ul>
                    </li>
                  )}

                  {/* Promotion page */}
                  {promotions?.length > 0 && (
                    <li className="nav-menu__item has-submenu">
                      <Link href={`/promotion`} className="nav-menu__link">
                        Promotions
                      </Link>
                      <ul className="nav-submenu" style={{
                        border: "1px solid #F0F0F0",
                        borderRadius: "8px",
                        backgroundColor: "#fff",
                        // transform: 'translateX(-250px)',
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                        left: "0",
                        right: "0",
                      }}>
                        {promotions?.length > 0 ?
                          promotions.map((item, i) => {
                            return (
                              <Link key={i} href={getPromotionHref(item, promo_slug)} className="nav-submenu__link custom-transition ms-2">
                                {item.name}
                              </Link>
                            )
                          })
                          :
                          <p className="n2-color slide-horizontal" data-splitting>No Promotions available</p>
                        }
                      </ul>
                    </li>
                  )}
                  <Link href="/all-products">
                    <button className="nav-menu__link" data-splitting>
                      Products
                    </button>
                  </Link>

                  {blog_title && blog_url && (
                    <li className="nav-menu__item">
                      <Link href={blog_url} target="_blank" className="nav-menu__link">
                        {blog_title}
                      </Link>
                    </li>
                  )}
                </ul>

              </div>

              {/* Search & Promotional Merchants */}
              <div className="col-lg-2 col-md-9 col-sm-9 flex-column d-xl-flex d-lg-flex d-none">
                <div className="search-custom-new" style={{ alignItems: "flex-end" }}>
                  <Suspense fallback={<div></div>}>
                    <SearchBar
                      companyId={company_id}
                      mer_slug={mer_slug}
                      slug_type={mer_slug_type}
                      cat_slug={cat_slug}
                    // domain= {domain}
                    />
                  </Suspense>

                  {/* <div className="merchant-tags-custom d-none d-xl-flex d-lg-flex d-md-flex mt-2">
                    {promotionalMerchants && promotionalMerchants?.length > 0 && promotionalMerchants.map((item, i) => {
                      if (i < 10) {
                        return (
                          <div key={i} className="merchant-tag">
                            <Link href={getMerchantHref(item, mer_slug, mer_slug_type)} className="f-14">
                              {item.merchant_name}
                            </Link>
                          </div>
                        )
                      }
                    })}
                  </div> */}
                </div>
              </div>



              {/* Mobile Menu Button */}
              {/* <div className="col-6 col-md-1 col-sm-1 d-lg-none text-end">
                <button
                  type="button"
                  className="toggle-mobileMenu"
                // onClick={toggleMobileMenu}
                >
                  <i className="las la-bars" />
                </button>
              </div> */}

              {/* Mobile Navbar */}
              <div className="col-6 col-md-1 col-sm-1 d-lg-none text-end">
                <MobileNavbarWrapper
                  companyId={company_id}
                  logo={companyLogo}
                  categories={categories}
                  merchantData={merchantData}
                  events={events}
                  blog_title={blog_title}
                  blog_url={blog_url}
                  mer_slug={mer_slug}
                  cat_slug={cat_slug}
                  mer_slug_type={mer_slug_type}
                  promo_slug={promo_slug}
                  promotions={promotions}
                />
              </div>
            </div>
          </nav>



        </div>


        <div className="top-promo-merchants" style={{ backgroundColor: "#0086CA" }}>
          <div className="merchant-tags-custom d-none d-xl-flex d-lg-flex d-md-flex justify-content-center">
            {promotionalMerchants && promotionalMerchants?.length > 0 && promotionalMerchants.map((item, i) => {
              if (i < 10) {
                return (
                  <div key={i} className="merchant-tag text-white">
                    <Link href={getMerchantHref(item, mer_slug, mer_slug_type)} className="f-14">
                      {item.merchant_name}
                    </Link>
                  </div>
                )
              }
            })}
          </div>
        </div>
      </header>

      {/* ==================== Header End Here ==================== */}

      {/* <div className={`mobile-menu d-lg-none d-block ${active && "active"} shadow`}>
      <div className={`mobile-menu d-lg-none d-block `}>
        <button type="button" className="close-button text-body hover-text-main" onClick={toggleMobileMenu}>
        <button type="button" className="close-button text-body hover-text-main" >
          <i className="las la-times" />
        </button>
        <div className="mobile-menu__inner">
          <div className="logo">
            <Link href="/" className="link white-version">
              <Image src={companyLogo} alt="Company Logo" width={150} height={100} />
            </Link>
          </div> */}
      {/* Search & Promotional Merchants */}
      {/* <div className="search-custom-new">
            <Suspense fallback={<div></div>}>
              <SearchBar
                companyId={company_id}
                mer_slug={mer_slug}
                slug_type={mer_slug_type}
                cat_slug={cat_slug}
              // domain={domain}
              />
            </Suspense>

            <div className="merchant-tags-custom  mt-2">
              {promotionalMerchants && promotionalMerchants?.length > 0 && promotionalMerchants.map((item, i) => {
                if (i < 10) {
                  return (
                    <div key={i} className="merchant-tag">
                      <Link href={getMerchantHref(item, mer_slug, mer_slug_type)} className="f-14">
                        {item.merchant_name}
                      </Link>
                    </div>
                  )
                }
              })}
            </div>
          </div>

          <div className="mobile-menu__menu">
            <ul
              className="nav-menu flx-align nav-menu--mobile"
              id="offcanvas-navigation"
            >
              <li className="nav-menu__item  ">
                <Link href="/" className="nav-menu__link">
                  Home
                </Link>
              </li>
              <li className="nav-menu__item has-submenu">
                <Link href="/" className="nav-menu__link">
                  Category
                </Link>
                <ul className="nav-submenu">
                  <li className="nav-submenu__item">
                    <Link href="/" className={"nav-submenu__link"} >
                      Category 1
                    </Link>
                  </li>
                  <li className="nav-submenu__item">
                    <Link
                      href="/"
                      className={"nav-submenu__link"}
                    >
                      Category 2
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-menu__item has-submenu">
                <Link href="/" className="nav-menu__link">
                  Store
                </Link>
                <ul className="nav-submenu">
                  <li className="nav-submenu__item">
                    <Link href="/" className={"nav-submenu__link"} >
                      Store 1
                    </Link>
                  </li>
                  <li className="nav-submenu__item">
                    <Link href="/" className={"nav-submenu__link"} >
                      Store 2
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default NavbarOne;
