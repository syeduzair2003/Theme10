"use client";

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

type Props = {
    slug: string;
    promoSlug: string;
    currentType?: string;
    currentSort?: string;
};

const PromotionFilterBar = ({ slug, currentType, currentSort, promoSlug }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const getSortLabel = (key?: string) => {
        switch (key) {
            case 'ending_soon': return 'Ending Soon';
            case 'recently_updated': return 'Recently Updated';
            case 'best_discount': return 'Best Discount';
            default: return 'Sort By';
        }
    };

    return (
        /* Added 'position-relative' to ensure z-index context starts here if needed */
        <div className="promotion-filter-bar mb-4 position-relative">
            
            {/* Filter Pills */}
            <div className="filter-pills">
                <Link
                    href={`/promotion/${slug}${currentSort ? `?sort=${currentSort}` : ''}`}
                    className={`filter-pill ${!currentType ? 'active' : ''}`}
                >
                    All Offers
                </Link>
                <Link
                    href={`/promotion/${slug}?type=code${currentSort ? `&sort=${currentSort}` : ''}`}
                    className={`filter-pill ${currentType === 'code' ? 'active' : ''}`}
                >
                    Coupons
                </Link>
                <Link
                    href={`/promotion/${slug}?type=deal${currentSort ? `&sort=${currentSort}` : ''}`}
                    className={`filter-pill ${currentType === 'deal' ? 'active' : ''}`}
                >
                    Deals
                </Link>
            </div>

            {/* Dropdown Group */}
            {/* IMPORTANT: This div needs position: relative via css class */}
            <div className="promo-sort-group" ref={dropdownRef}>
                <button
                    className={`promo-sort-btn ${isOpen ? 'show' : ''}`}
                    type="button"
                    onClick={toggleDropdown}
                >
                    <span className="text-muted small me-1">Sort:</span> 
                    <span className="fw-bold">{getSortLabel(currentSort)}</span>
                    {/* Optional Arrow Icon */}
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className={`ms-2 transition-transform ${isOpen ? 'rotate-180' : ''}`} style={{ transition: 'transform 0.2s' }}>
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                
                {/* The Menu */}
                {isOpen && (
                    <div className="promo-sort-menu">
                        <Link 
                            className={`promo-sort-item ${currentSort === 'ending_soon' ? 'active' : ''}`} 
                            href={`?sort=ending_soon${currentType ? `&type=${currentType}` : ''}`}
                            onClick={() => setIsOpen(false)}
                        >
                            <span className="me-2">⏳</span> Ending Soon
                        </Link>
                        
                        <Link 
                            className={`promo-sort-item ${currentSort === 'recently_updated' ? 'active' : ''}`} 
                            href={`?sort=recently_updated${currentType ? `&type=${currentType}` : ''}`}
                            onClick={() => setIsOpen(false)}
                        >
                            <span className="me-2">🕒</span> Recently Updated
                        </Link>
                        
                        <Link 
                            className={`promo-sort-item ${currentSort === 'best_discount' ? 'active' : ''}`} 
                            href={`?sort=best_discount${currentType ? `&type=${currentType}` : ''}`}
                            onClick={() => setIsOpen(false)}
                        >
                            <span className="me-2">🏷️</span> Best Discount
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PromotionFilterBar;