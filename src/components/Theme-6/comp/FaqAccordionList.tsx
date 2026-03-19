'use client';

import { faAngleRight, faChevronDown, faGreaterThan, FontAwesomeIcon } from '@/constants/icons';
import React, { useState } from 'react';

// 1. Updated Interface: Make 'id' optional to match your API data
interface FAQ {
    id?: number | string;
    question: string;
    answer: string;
}

interface FaqListProps {
    faqs: FAQ[];
}

const FaqAccordionList = ({ faqs }: FaqListProps) => {
    // 2. Use index 0 as the default open item if no ID exists
    const [activeId, setActiveId] = useState<number | string | null>(0);

    const toggle = (id: number | string) => {
        setActiveId(activeId === id ? null : id);
    };

    return (
        <div className="faqAccordionBox">
            {faqs.map((item, index) => {
                // 3. Use item.id if it exists, otherwise fallback to the array index
                const currentId = item.id !== undefined ? item.id : index;

                return (
                    <div
                        key={currentId}
                        className={`faqItem ${activeId === currentId ? 'faqActive' : ''}`}
                    >
                        <button
                            className="faqHeader"
                            onClick={() => toggle(currentId)}
                            type="button"
                            aria-expanded={activeId === currentId}
                        >
                            <span className="faqQuestionText">{item.question}</span>
                            <span className="faqIndicator">
                                <FontAwesomeIcon icon={activeId === currentId ? faChevronDown : faAngleRight} />
                            </span>
                        </button>

                        <div className={`faqCollapse ${activeId === currentId ? 'faqShow' : ''}`}>
                            <div className="faqContentWrapper">
                                <div
                                    className="faqContentText"
                                    // Use dangerouslySetInnerHTML if your API returns HTML strings
                                    dangerouslySetInnerHTML={{ __html: item.answer }}
                                />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default FaqAccordionList;