import React from 'react';
import Image from 'next/image';

const AllProductsHeroCard = () => {
    return (
        <div className="lg:w-2/5 w-full">
            <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500 to-violet-500 rounded-[4rem] blur-2xl opacity-20 group-hover:opacity-30 transition duration-1000"></div>
                <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden border-[10px] border-white/5 shadow-2xl">
                    <Image
                        src="/shared-assets/BANNER.png"
                        alt="Exclusive Offers"
                        fill
                        className="object-contain transition-transform duration-700"
                        priority
                    />
                </div>
            </div>
        </div>
    );
};

export default AllProductsHeroCard;