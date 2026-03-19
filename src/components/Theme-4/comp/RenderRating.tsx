import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

interface Props {
  rating: number;
}

const RenderRating = ({ rating }: Props) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) {
          return (
            <FaStar
              key={i}
              className="h-5 w-5 text-yellow-400 drop-shadow-sm"
            />
          );
        } else if (i === fullStars && hasHalfStar) {
          return (
            <FaStarHalfAlt
              key={i}
              className="h-5 w-5 text-yellow-400 drop-shadow-sm"
            />
          );
        } else {
          return (
            <FaStar key={i} className="h-5 w-5 text-gray-300" />
          );
        }
      })}
    </div>
  );
};

export default RenderRating;
