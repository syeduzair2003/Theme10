import { Merchant } from "@/services/dataTypes";
import Image from "next/image";
import Link from "next/link";


interface SimilarStoresSectionProps {
  merchants: Merchant[];
  variant?: "default" | "sidebar";
}

const SimilarStoresSection = ({ merchants, variant = "default" }: SimilarStoresSectionProps) => {
  if (!merchants?.length) return null;

  if (variant === "sidebar") {
    return (
      <div className="grid grid-cols-2 gap-4">
        {merchants.map((merchant) => (
          <Link
            key={merchant.id}
            href={`/store/${merchant.slug}`}
            className="flex flex-col items-center text-center group"
          >
            <div className="w-16 h-16 relative border rounded-lg bg-white flex items-center justify-center overflow-hidden group-hover:shadow-md">
              <Image
                src={`/${merchant.merchant_logo}`}
                alt={merchant.merchant_name}
                width={100}
                height={100}
                className="object-contain"
              />
            </div>
            <span className="mt-2 text-xs text-slate-600 line-clamp-2">
              {merchant.merchant_name}
            </span>
          </Link>
        ))}
      </div>
    );
  }

  // default (if used somewhere else in full page)
  return (
    <div className="flex flex-wrap gap-4">
      {merchants.map((merchant) => (
        <Link key={merchant.id} href={`/store/${merchant.slug}`}>
          <div className="flex items-center gap-2 p-2 border rounded-md hover:shadow-md">
            <Image
              src={merchant.merchant_logo}
              alt={merchant.merchant_name}
              width={40}
              height={40}
              className="object-contain"
            />
            <span>{merchant.merchant_name}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SimilarStoresSection;
