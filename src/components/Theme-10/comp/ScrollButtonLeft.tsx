"use client";
import { faAngleLeft, FontAwesomeIcon } from '@/constants/icons';
import React, { useEffect, useState } from 'react';

const ScrollButtonLeft = ({ sectionType }: { sectionType: string }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const checkOverflow = () => {
            const container = document.querySelector(
                `.horizontal-scroll-${sectionType}`
            ) as HTMLElement | null;

            if (container) {
                // Hum +5 isliye check kar rahe hain taake minor pixel gaps par button na show ho
                setVisible(container.scrollWidth > container.clientWidth + 5);
            }
        };

        checkOverflow();
        window.addEventListener("resize", checkOverflow);

        return () => window.removeEventListener("resize", checkOverflow);
    }, [sectionType]);

    // 🔥 Agar cards 4 ya us se kam hain toh maroon circle nazar nahi aayega
    if (!visible) return null;

    return (
        <button
            className="bg-[#800000] text-[#fffde0] w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full shadow-[0_10px_20px_rgba(128,0,0,0.3)] border border-[#fffde0]/10 hover:scale-110 hover:bg-[#1A1A1A] transition-all duration-300 cursor-pointer"
            onClick={() => {
                const container = document.querySelector(`.horizontal-scroll-${sectionType}`);
                if (container) {
                    // Accurate width calculate karke utna hi piche scroll karega
                    const containerWidth = container.getBoundingClientRect().width;
                    container.scrollBy({ left: -containerWidth, behavior: "smooth" });
                }
            }}
            aria-label="Scroll Left"
        >
            <FontAwesomeIcon
                icon={faAngleLeft}
                className="w-4 h-4 md:w-5 md:h-5"
                style={{ color: 'currentColor' }} 
            />
        </button>
    );
};

export default ScrollButtonLeft;