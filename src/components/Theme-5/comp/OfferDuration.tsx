import { calculateOfferDuration } from '@/constants/hooks';
import { faCalendarDays, FontAwesomeIcon } from '@/constants/icons';
import React from 'react';

interface Props {
    endDate: string | null;
    className?: string;
}

const OfferDuration = ({ endDate, className }: Props) => {
    return (
        <div className={`flex items-center gap-2 mb-4 ${className || ''}`}>
            <span className="bg-indigo-50 border border-indigo-200 rounded px-2 py-1 flex items-center gap-1 text-xs">
                <FontAwesomeIcon icon={faCalendarDays} className="w-3 h-3 text-slate-900" />
                <span className="text-indigo-600 hover:text-indigo-700 font-medium">
                    {calculateOfferDuration(endDate)}
                </span>
            </span>
        </div>
    );
};

export default OfferDuration;