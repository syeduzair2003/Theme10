import { getRandomStoreSeoTitle } from "@/constants/hooks";
import Image from "next/image";
import Button from "./Button";

interface TrendingMerchantsProps {
  image: string;
  name: string;
  slug: string;
}

export default function TrendingMerchantsCard({ image, name, slug }: TrendingMerchantsProps) {
  return (
    <div className="md:w-[280px] h-[200px] mb-4 bg-white rounded-xl border-gray-100 shadow-sm p-4 flex flex-col items-center justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      {/* Logo */}
      <div className="relative w-full h-28 flex items-center justify-center mb-5">
        <Image
          src={`/${image}`}
          alt={name}
          fill
          className="object-contain"
        />
      </div>

      {/* Button */}
      <Button
  className="mt-auto bg-[var(--primary-color)] text-center rounded-lg w-full 
             !text-black shadow-md btn-hover-gradient hover:!text-white"
  label={getRandomStoreSeoTitle(name)}
  variant="ghost"
  size="sm"
  href={slug}
/>
    </div>
  );
}
