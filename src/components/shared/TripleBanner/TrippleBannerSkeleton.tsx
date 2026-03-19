import React from 'react';
import './TrippleBannerSkeleton.css'; // Custom styles

const TripleBannerSkeleton = () => {
  return (
    <>
      {/* Mobile Skeleton: Single card */}
      <div className="d-md-none">
        <div className="skeleton-banner large-banner mb-2 w-100" />
        <div className="skeleton-text w-50 mx-auto" />
      </div>

      {/* Desktop Skeleton: Triple card layout */}
      <div className="row g-3 justify-content-center d-none d-md-flex">
        {/* Small Left */}
        <div className="col-md-4 col-lg-3">
          <div className="skeleton-banner small-banner mb-2 w-100" />
          <div className="skeleton-text w-75 mx-auto" />
        </div>

        {/* Large Center */}
        <div className="col-md-4 col-lg-6">
          <div className="skeleton-banner large-banner mb-2 w-100" />
          <div className="skeleton-text w-50 mx-auto" />
        </div>

        {/* Small Right */}
        <div className="col-md-4 col-lg-3">
          <div className="skeleton-banner small-banner mb-2 w-100" />
          <div className="skeleton-text w-75 mx-auto" />
        </div>
      </div>
    </>
  );
};

export default TripleBannerSkeleton;
