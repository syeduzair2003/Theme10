import { calculateOfferDuration } from '@/constants/hooks';
import { faCalendarDays, FontAwesomeIcon } from '@/constants/icons';
import React from 'react'

interface Props {
    endDate: string | null;
    className?: string;
}
const OfferDuration = ({ endDate, className }: Props) => {
    if (endDate === null || endDate === undefined) {
        return (
            <div className={`d-center justify-content-start gap-2 gap-md-3 overflow-hidden ${className ?? className}`}>
                <span className="f5-color fw-mid rounded-2 s1-4th-bg-color cus-border border b-sixth px-2
                            px-md-3 py-1 d-flex gap-1 gap-md-2 animate-box overflow-hidden">
                    <FontAwesomeIcon icon={faCalendarDays} style={{ width: '16px', height: '16px', color: '#b3682b' }}/>
                    <span className="f11-color fw-mid text-anim">{calculateOfferDuration(endDate)}</span>
                </span>
            </div>
        )
    } else {
        return (
            <div className={`offer-duration-root ${className ? className : ''}`}>
                <span className="offer-duration-blink">
                    <FontAwesomeIcon icon={faCalendarDays} style={{ width: '16px', height: '16px', color: '#b3682b' }}/>
                    <span className="offer-duration-text">
                        {calculateOfferDuration(endDate)}
                    </span>
                </span>
            </div>
        );
    }
}

export default OfferDuration
