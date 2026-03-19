import Image from 'next/image';
import React from 'react';

interface CarouselMerchantCardProps {
  merchant: {
    name: string;
    logo: string;
    deals: string;
  };
  companyDomain?: string;
}

const CarouselMerchantCard: React.FC<CarouselMerchantCardProps> = ({ merchant, companyDomain = "" }) => {
  const imageSrc = merchant.logo
  return (
    <div className="group relative bg-white p-10 flex flex-col items-center justify-center border-r border-b border-slate-50 transition-all duration-500 hover:z-10 hover:shadow-[0_20px_50px_rgba(79,70,229,0.1)] hover:-translate-y-1">
      {/* Logo Container */}
      <div className="relative h-16 w-full mb-6 transition-all duration-500 opacity-60 group-hover:opacity-100 group-hover:scale-110">
        <Image
          src={imageSrc}
          alt={merchant.name}
          fill
          className="object-contain"
        />
      </div>

      {/* Labeling */}
      <div className="text-center transition-all duration-300 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-tighter">
          {merchant.name}
        </h3>
        <div className="flex items-center justify-center gap-1.5 mt-1">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
          </span>
          <p className="text-[11px] font-black text-indigo-600 uppercase tracking-widest">
            {merchant.deals} Live Deals
          </p>
        </div>
      </div>

      {/* Subtle Hover Indicator Line */}
      <div className="absolute bottom-0 left-0 w-0 h-1 bg-indigo-600 transition-all duration-500 group-hover:w-full" />
    </div>
  );
};

export default CarouselMerchantCard;