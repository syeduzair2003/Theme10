import React from "react";
import Accordion from 'react-bootstrap/Accordion';
import Link from "next/link";
import AccordionItem from 'react-bootstrap/AccordionItem';
import AccordionHeader from 'react-bootstrap/AccordionHeader';
import AccordionBody from 'react-bootstrap/AccordionBody';
import { Faqs } from "@/services/dataTypes";

interface Props {
    merchantName: string;
    faqs: Faqs[];
}

const MerchantFaqsSidebar: React.FC<Props> = ({ merchantName, faqs }) => {
    if (!faqs || faqs.length === 0) return null;

    const heading =
        merchantName.length > 15 ? `${merchantName} FAQs` : `${merchantName} FAQs`;

    return (
        <div className="merchant-faqs-wrapper">
            <h4 className="sidebar-heading">{heading}</h4>

            <Accordion defaultActiveKey="0" flush>
                {faqs.map((faq, i) => (
                    <AccordionItem
                        eventKey={String(i)}
                        key={i}
                        className="merchant-faqs-item"
                    >
                        <AccordionHeader className="merchant-faqs-question">
                            {faq.question}
                        </AccordionHeader>
                        <AccordionBody className="merchant-faqs-answer">
                            <span dangerouslySetInnerHTML={{ __html: faq.answer }} />
                        </AccordionBody>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
};

export default MerchantFaqsSidebar;
