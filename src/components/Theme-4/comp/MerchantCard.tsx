import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

interface MerchantCardProps {
  merchant_logo: string;
  merchant_name: string;
  href: string;
}

const MerchantCard = ({ merchant_logo, merchant_name, href }: MerchantCardProps) => {
  return (
    <Link
      href={href}
      className="no-underline group block w-full rounded-2xl border border-gray-100 bg-white 
                 shadow-sm hover:shadow-lg hover:border-[var(--primary-color)] 
                 transition-all duration-300 ease-in-out"
    >
      <div
        className="flex flex-col py-5 px-3
                   sm:flex-row sm:text-left sm:items-center sm:gap-6"
      >
        {/* Logo container */}
        <div className="w-20 h-20 flex items-center justify-center rounded-xl bg-gray-50 border border-gray-200 overflow-hidden mb-4 sm:mb-0">
          <Image
            src={`/${merchant_logo}`}
            alt={merchant_name}
            width={80}
            height={80}
            className="object-contain max-w-[70%] max-h-[70%]"
          />
        </div>

        {/* Text Section */}
        <div className="flex-1">
          <h3 className="text-base font-semibold text-gray-800 group-hover:text-[var(--primary-color)] transition-colors">
            {merchant_name}
          </h3>

          <div className="flex items-center justify-center sm:justify-between">
            <p className="text-sm pt-1 text-gray-500 group-hover:text-[var(--primary-color)] transition-colors">
              View All Offers
            </p>
            <FaArrowRight
              size={18}
              className="ml-2 sm:ml-4 text-[var(--primary-color)] opacity-0 -translate-x-2
                         group-hover:opacity-100 group-hover:translate-x-0 
                         transition-all duration-300"
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MerchantCard;
