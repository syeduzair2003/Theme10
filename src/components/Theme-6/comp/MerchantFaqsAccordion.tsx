import { Faqs } from '@/services/dataTypes';
import AccordionItem from 'react-bootstrap/AccordionItem';
import AccordionHeader from 'react-bootstrap/AccordionHeader';
import AccordionBody from 'react-bootstrap/AccordionBody';

interface Props {
    faq: Faqs;
    index: number;
}

const MerchantFaqsAccordion = ({ faq, index }: Props) => {
    return (
        <AccordionItem eventKey={`${index}`}>
            <AccordionHeader>
                <span style={{
                    whiteSpace: 'normal',
                    overflowWrap: 'break-word',
                    display: 'block',
                    fontWeight: 500,
                    color: '#333',
                }}>
                    {faq.question}
                </span>
            </AccordionHeader>
            <AccordionBody>
                <div>
                    {faq.answer}
                </div>
            </AccordionBody>
        </AccordionItem>
    );
}

export default MerchantFaqsAccordion;