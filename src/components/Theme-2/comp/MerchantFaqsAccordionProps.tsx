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
        <AccordionItem eventKey={String(index)} className="faq-item">
            <AccordionHeader>{faq.question}</AccordionHeader>
            <AccordionBody>{faq.answer}</AccordionBody>
        </AccordionItem>
    )
}

export default MerchantFaqsAccordion
