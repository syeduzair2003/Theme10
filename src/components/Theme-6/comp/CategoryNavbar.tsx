'use client'
import React, { useState } from "react";
import Link from "next/link";
import { CategoryData } from "@/services/dataTypes";

interface Props {
    categories: CategoryData[];
    cat_slug: string;
}

const CategoryNavbar = ({ categories, cat_slug }: Props) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    let hoverTimeout: NodeJS.Timeout | null = null;

    const handleMouseEnter = () => {
        if (hoverTimeout) clearTimeout(hoverTimeout);
        setIsMenuOpen(true);
    };

    const handleMouseLeave = () => {
        hoverTimeout = setTimeout(() => {
            setIsMenuOpen(false);
        }, 150);
    };

    return (
        <div className="nav-animation header-nav navbar-collapse d-flex justify-content-end navBar-nav-item">
            <ul className="nav navbar-nav">
                <li
                    className="has-child nav-menu__item"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    style={{ position: "relative" }}
                >
                    <Link href={`/${cat_slug}`} className="nav-menu__link">
                        Categories
                    </Link>

                    {/* Dropdown */}
                    <ul
                        className="sub-menu"
                        style={{
                            color: "#346065",
                            backgroundColor: "#EFFFFF",
                            fontFamily: '"Figtree", sans-serif',
                            lineHeight: 1.5,
                            fontWeight: 400,
                            padding: 0,
                            margin: 0,
                            overflowX: "hidden",
                            fontSize: "14px",
                            display: isMenuOpen ? "block" : "none",
                            position: "absolute",
                            top: "100%",
                            left: "0",
                            minWidth: "200px",
                            border: "1px solid #F0F0F0",
                            borderRadius: "5px",
                            boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                            zIndex: 1000,
                            width: "max-content",
                        }}
                    >
                        {categories?.length > 0 ? (
                            categories.map((category) => (
                                <li key={category.unique_id} className="nav-submenu__item" style={{ padding: "10px", borderBottom: "1px solid #f0f0f0" }}>
                                    <Link href={`/${category.url}`} className="nav-submenu__link">
                                        {category.name}
                                    </Link>
                                </li>
                            ))
                        ) : (
                            <li style={{ padding: "10px", textAlign: "center" }}>No categories available</li>
                        )}
                    </ul>
                </li>
            </ul>
        </div>
    );
};

export default CategoryNavbar;
