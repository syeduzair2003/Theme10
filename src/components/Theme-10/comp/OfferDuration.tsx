import { calculateOfferDuration } from '@/constants/hooks';
import React from 'react';
import { CalendarDays, Clock } from 'lucide-react';

interface Props {
    endDate: string | null;
    className?: string;
}

const OfferDuration = ({ endDate, className }: Props) => {
    const durationText = calculateOfferDuration(endDate);
    const isPermanent = endDate === null || endDate === undefined;

    return (
        <div className={`flex items-center ${className ?? ''}`}>
            <span 
                // Style attribute sabse zyada power rakhta hai
                style={{ color: isPermanent ? 'white' : '#60a5fa' }}
                className={`
                    inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider
                    transition-all duration-300 border
                    ${isPermanent 
                        ? 'bg-[#1d4ed8db] border-slate-700/50 !text-white shadow-sm' 
                        : 'bg-blue-500/10 border-blue-500/20 !text-blue-400 animate-pulse'
                    }
                `}
            >
                {isPermanent ? (
                    <CalendarDays size={14} className="opacity-90 !text-white" />
                ) : (
                    <Clock size={14} className="!text-blue-400" />
                )}
                
                {/* Yahan !text-white ya inline style lazmi hai */}
                <span className={`whitespace-nowrap ${isPermanent ? '!text-white' : '!text-blue-400'}`}>
                    {durationText}
                </span>
            </span>
        </div>
    );
};

export default OfferDuration;