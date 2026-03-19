import { emptyStar, filledStar, FontAwesomeIcon } from '@/constants/icons';
import React from 'react';

interface Props {
  rating: number;
}

const RenderRating = ({ rating }: Props) => {
  const roundedRating = Math.round(rating);

  return (
    <div className='d-flex justify-content-center'>
      {[...Array(5)].map((_, index) => (
        <FontAwesomeIcon
          key={index}
          icon={index < roundedRating ? filledStar : emptyStar}
          className={`star-icon ${index < roundedRating ? 'active-color' : ''}`}
          style={{
            fontSize: '20px',
            lineHeight: '130%',
            color: index < roundedRating ? 'orange' : undefined,
            height: '20px',
            width: '20px',
          }}
        />
      ))}
    </div>
  );
};

export default RenderRating;
