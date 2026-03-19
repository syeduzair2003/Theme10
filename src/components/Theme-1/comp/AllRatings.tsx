import React from 'react'
import Link from 'next/link'
import { Comments } from '@/services/dataTypes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faStar } from '@fortawesome/free-regular-svg-icons';
import { rantingHandler } from '@/constants/hooks';

interface Props {
    comment: Comments;
    key: number;
}
const AllRatings = ({ comment }: Props) => {
    const calculatePeriod = (toCalculate: string): string => {
    const now = new Date();
    const given = new Date(toCalculate);
    const nowDay: number = now.getDate();
    const nowMonth: number = now.getMonth() + 1;
    const nowYear: number = now.getFullYear();
    const givenDay: number = given.getDate();
    const givenMonth: number = given.getMonth() + 1;
    const givenYear: number = given.getFullYear();

    if (nowYear === givenYear) {
        if (nowMonth === givenMonth) {
            if (nowDay === givenDay) {
                return "Today";
            } else if (nowDay - givenDay === 1) {
                return "1 day ago";
            } else {
                const diffInDays = nowDay - givenDay;
                return `${diffInDays} days ago`;
            }
        } else {
            const diffInMonths = nowMonth - givenMonth;
            if (diffInMonths === 1) return "1 month ago";
            return `${diffInMonths} months ago`;
        }
    } else {
        const diffInYears = nowYear - givenYear;
        if (diffInYears === 1) return "1 year ago";
        return `${diffInYears} years ago`;
    }

    };
return (
    <>
    <div className="product-review-wrapper mb-3">
    <div className="product-review">
    <div className="product-review__top flx-between">
    <div className="product-review__rating flx-align">
    <div className="d-flex align-items-center gap-1">
    <ul className="star-rating">
        {rantingHandler(comment.rating).map((rate, index) => {
            return (
                rate ?
                    <li key={index} className="star-rating__item font-17">
                        <i className="fas fa-star" />
                    </li>
                    :
                    <FontAwesomeIcon key={index} icon={faStar} />
            )
        })}
    </ul>
    <span className="star-rating__text text-body">{comment.rating}</span>
    </div>
    </div>
    <div className="product-review__date">
        {calculatePeriod(comment.created_at)}
    </div>
    </div>
    <div className="product-review__body">
        <p className="product-review__desc">
            {comment.comment}
        </p>
    </div>
    </div>
    </div>
    </>
)
}

export default AllRatings
