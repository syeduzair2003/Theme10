'use client'
import React, { useState } from "react";
import Link from "next/link";
// import Image from "next/image";
import { CategoryData, CompanyWiseMerchant, Merchant } from "@/services/dataTypes";
import { apiMerchantDetailsByCategory } from "@/apis/merchant";
import Image from 'next/image'
import { getBaseImageUrl, getMerchantHref } from "@/constants/hooks";

interface Props {
    categories: CategoryData[];
    companyId: string;
    slug_type: string;
    cat_slug: string;
    merchant_slug: string;
    domain: string;
}

const CategoryMerchantNav = ({ categories, companyId, slug_type, cat_slug, merchant_slug, domain }: Props) => {
    const [merchants, setMerchants] = useState<CompanyWiseMerchant[]>([]);
    const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Track menu visibility
    let hoverTimeout: NodeJS.Timeout | null = null; // Timeout reference

    const fetchMerchants = async (categoryId: string) => {
        try {
            const response = await apiMerchantDetailsByCategory(categoryId, companyId);
            // console.log(response);
            setMerchants(response.data?.merchants || []);
        } catch (error) {
            // console.error("Error fetching merchants:", error);
            setMerchants([]);
        }
    };

    const handleMouseEnter = () => {
        if (hoverTimeout) clearTimeout(hoverTimeout); // Clear any previous timeout
        setIsMenuOpen(true); // Open the menu
    };

    const handleMouseLeave = () => {
        hoverTimeout = setTimeout(() => {
            setIsMenuOpen(false); // Close the menu after delay
            setHoveredCategory(null);
            setMerchants([]);
        }, 150); // Delay in milliseconds
    };

    const styles: any = {
        menuContainer: {
            display: isMenuOpen ? "flex" : "none",
            width: "700px",
            minHeight: "280px",
            maxHeight: "calc(100vh - 50px)",
            border: "1px solid #F0F0F0",
            borderRadius: "8px",
            backgroundColor: "#fff",
            position: "absolute",
            top: "100%",
            left: "0",
            zIndex: 1000,
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            color: "#000000",
            // transform: 'translateX(-512px)'
        },
        categoriesContainer: {
            width: "300px",
            borderRight: "1px solid #ddd",
            overflowY: "auto",
            padding: "10px",
        },
        merchantsContainer: {
            flex: 1,
            flexGrow: 1,
            padding: "10px",
            overflowY: "auto",
        },
        categoryItem: {
            padding: "5px",
            cursor: "pointer",
            borderBottom: "1px solid #f0f0f0",
        },
        merchantItem: {
            padding: "5px",
            // fontSize: "14px",
            borderBottom: "1px solid #ddd",
            overflowY: "auto",
        },
        noData: {
            textAlign: "center",
            color: "#000000",
            marginTop: "20px",
        },
        linkStyle: {
            color: "#000000",
            textDecoration: "none",
            ':hover': {
                color: "#5e36f2",
            },
        },
    };

    // const getMerchantHref = (item: CompanyWiseMerchant) => `/${merchant_slug}/${item[slug_type as keyof CompanyWiseMerchant] || item.slug}`;
    // const getHref = (item: CategoryData) => `/${cat_slug}/${item[slug_type as keyof CategoryData] || item.slug}`;

    return (
        <li
            className="nav-menu__item has-submenu text-dark text-decoration-none fw-medium d-inline-block"
            onMouseEnter={handleMouseEnter} // Open menu on hover
            onMouseLeave={handleMouseLeave} // Delay closing on leave
            style={{ position: "relative" }} // Ensure <li> is the anchor for positioning
        >
            <Link href={`/${cat_slug}`} style={styles.linkStyle} className="nav-menu__link">Category</Link>

            <div
                style={styles.menuContainer}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div style={styles.categoriesContainer} className="customScrollNavbar">
                    {categories?.length > 0 ? (
                        categories.map((category: CategoryData, i: number) => {
                            // const href = getHref(category);
                            return (
                                <div
                                    key={i}
                                    style={styles.categoryItem}
                                    className="font-17 nav-submenu__item"
                                    onMouseEnter={() => {
                                        setHoveredCategory(category.unique_id);
                                        fetchMerchants(category.unique_id);
                                    }}
                                >
                                    <Link href={`/${category.url}`} className="nav-submenu__link">
                                        {category.name}
                                    </Link>
                                </div>
                            )
                        })
                    ) : (
                        <p style={styles.noData}>No categories available</p>
                    )}
                </div>

                <div style={styles.merchantsContainer}>
                    {hoveredCategory && merchants.length > 0 ? (
                        merchants.map((merchant, index) => {
                            const href = getMerchantHref(merchant, merchant_slug, slug_type);
                            return (
                                <div key={index} style={merchants.length !== index + 1 ? { ...styles.merchantItem, borderBottom: "1px solid #ddd" } : { ...styles.merchantItem, borderBottom: "none" }} className="font-17 customScrollNavbar">
                                    <Image
                                        src={getBaseImageUrl(domain, merchant?.merchant_logo, "")}
                                        alt=""
                                        width={70}
                                        height={50}
                                        objectFit="cover"
                                    />
                                    <Link href={href} style={styles.linkStyle} className="nav-submenu__link">
                                        {merchant.merchant_name}
                                    </Link>
                                </div>
                            )
                        })
                    ) : (
                        <p style={styles.noData}>
                            {hoveredCategory
                                ? "No merchants available for this category"
                                : "Hover over a category to see merchants"}
                        </p>
                    )}
                    <Link href={`/${merchant_slug}`} className="bottomLink text-decoration-underline hover-text-main font-15">
                        <p>View More</p>
                    </Link>
                </div>
            </div>
        </li>
    );
};

export default CategoryMerchantNav;
