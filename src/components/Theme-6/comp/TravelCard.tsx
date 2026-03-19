import React from "react";
import Link from "next/link";
import Image from "next/image";

// Define the interface for Type Safety
export interface TourData {
  id: number;
  image: string;
  duration: string;
  type: string;
  title: string;
  itinerary: string;
  oldPrice: number;
  newPrice: number;
  features: string[];
  rating: number;
}

interface TravelCardProps {
  tour: TourData;
}

const TravelCard: React.FC<TravelCardProps> = ({ tour }) => {
  return (
    <div className="travel-card">
      {/* Image Section */}
      <div className="travel-card-media">
        <Image
          src={tour.image}
          alt={tour.title}
          width={400}
          height={250}
          className="travel-card-image"
          unoptimized // Remove this if using remote patterns in next.config
        />
        <label className="travel-card-compare">
          <input type="checkbox" />
          <span>Add Compare</span>
        </label>
      </div>

      <div className="travel-card-body">
        {/* Meta Info */}
        <div className="travel-card-duration">
          <i className="bi bi-calendar2-week"></i>
          <span>{tour.duration} | {tour.type}</span>
        </div>

        {/* Title */}
        <h3 className="travel-card-title">
          <Link href={`/tours/${tour.id}`}>{tour.title}</Link>
        </h3>

        {/* Itinerary Path */}
        <p className="travel-card-route">{tour.itinerary}</p>

        {/* Icon Set (Static for all cards based on image) */}
        <ul className="travel-card-icons">
          <li><Image src="themes/Theme_6/images/holi-icon/hotels.png" alt="H" width={24} height={24} unoptimized /></li>
          <li><Image src="themes/Theme_6/images/holi-icon/Sightseeing.png" alt="S" width={24} height={24} unoptimized /></li>
          <li><Image src="themes/Theme_6/images/holi-icon/car.png" alt="T" width={24} height={24} unoptimized /></li>
          <li><Image src="themes/Theme_6/images/holi-icon/meal.png" alt="M" width={24} height={24} unoptimized /></li>
        </ul>

        {/* Pricing */}
        <div className="travel-card-price">
          <span className="price-label">Starting from</span>
          <div className="price-box">
            <span className="old-price">${tour.oldPrice}</span>
            <span className="new-price">${tour.newPrice}</span>
          </div>
          <span className="price-sub">Per Person on twin sharing</span>
        </div>

        {/* 2-Column Feature List */}
        <ul className="travel-card-features">
          {tour.features.map((feature, index) => (
            <li key={index}>
              <i className="bi bi-check-circle-fill"></i> {feature}
            </li>
          ))}
        </ul>

        {/* Footer actions */}
        <div className="travel-card-footer">
          <Link href="#" className="btn-book">Book Now</Link>
          <div className="rating-container">
            <span className="rating-text">({tour.rating} Review)</span>
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <i key={i} className="bi bi-star-fill"></i>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelCard;