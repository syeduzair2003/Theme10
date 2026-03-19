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
                setVisible(container.scrollWidth > container.clientWidth);
            }
        };

        checkOverflow();
        window.addEventListener("resize", checkOverflow);

        return () => window.removeEventListener("resize", checkOverflow);
    }, [sectionType]);

    if (!visible) return null; // 🔥 Don't render if not overflowing

    return (
        <button
            className="scroll-btn left"
            onClick={() => {
                document
                    .querySelector(`.horizontal-scroll-${sectionType}`)
                    ?.scrollBy({ left: -300, behavior: "smooth" });
            }}
        >
            <FontAwesomeIcon
                icon={faAngleLeft}
                style={{ width: '16px', height: '16px', color: 'white' }}
            />
        </button>
    );
};

export default ScrollButtonLeft;
