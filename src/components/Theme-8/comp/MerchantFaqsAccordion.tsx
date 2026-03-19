"use client";
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const MerchantFaqsAccordion = ({ faq, index }: { faq: any; index: number }) => {
    const [isOpen, setIsOpen] = useState(index === 0);

    return (
        <div className={`group border-2 transition-all duration-500 rounded-[2rem] ${isOpen ? 'border-blue-600 bg-white shadow-xl' : 'border-transparent bg-gray-100/50 hover:bg-gray-100'}`}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-7 text-left"
            >
                <span className={`text-xl font-bold transition-colors duration-300 ${isOpen ? 'text-gray-900' : 'text-gray-600'}`}>
                    {faq.question}
                </span>
                <div className={`p-2 rounded-full transition-all duration-500 ${isOpen ? 'bg-blue-600 text-white rotate-180' : 'bg-white text-gray-400'}`}>
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                </div>
            </button>
            
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-7 pb-7 text-gray-500 text-lg leading-relaxed">
                    <div className="h-[1px] w-full bg-gray-100 mb-6"></div>
                    {faq.answer}
                </div>
            </div>
        </div>
    );
}

export default MerchantFaqsAccordion;