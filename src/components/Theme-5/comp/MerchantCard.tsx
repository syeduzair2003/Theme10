import Image from 'next/image';
import React from 'react';

interface MerchantCardProps {
  merchant: {
    name: string;
    logo: string;
    cashback?: string;
  };
}

const MerchantCard: React.FC<MerchantCardProps> = ({ merchant }) => {
  return (
    <div className="group relative bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-100/50 hover:-translate-y-2 transition-all duration-500 overflow-hidden">
      {/* Logo Container */}
      <div className="relative z-10 w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-slate-50 rounded-3xl group-hover:bg-white group-hover:shadow-inner transition-colors">
        <Image
          src={merchant.logo}
          alt={merchant.name}
          fill
          className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Text Info */}
      <div className="relative z-10 text-center">
        <h3 className="text-sm font-bold text-slate-800 mb-2 truncate px-2 group-hover:text-indigo-600 transition-colors">
          {merchant.name}
        </h3>

        {merchant.cashback && (
          <div className="inline-block px-4 py-1.5 bg-indigo-600 text-white rounded-full shadow-lg shadow-indigo-200">
            <p className="text-[11px] font-black uppercase tracking-tighter">
              {merchant.cashback} Back
            </p>
          </div>
        )}
      </div>

      {/* Decorative Background Element (Visible on Hover) */}
      <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-indigo-50 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-150"></div>
    </div>
  );
};

export default MerchantCard;