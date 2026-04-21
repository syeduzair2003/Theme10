import { apiGetKeywords } from "@/apis/user";
import Link from "next/link";
import React from "react";
import { Tag } from "lucide-react"; // Optional: icon ke liye

type Props = {
  company_id: string;
  merchant_id: string;
};

const TagsSidebar = async ({ company_id, merchant_id }: Props) => {
  const tags = await apiGetKeywords(merchant_id, company_id);
  const merchantTags: string[] =
    tags.data.merchant.meta_keywords
      ?.split(",")
      .map((tag: string) => tag.trim()) || [];

  if (merchantTags.length === 0) return null;

  return (
    <div className="pt-8">
  {/* Section Header */}
  <div className="flex items-center gap-3 mb-6">
    <div className="p-2 bg-[#800000]/5 rounded-lg">
      <Tag size={18} className="text-[#800000]" />
    </div>
    <h4 className="text-lg font-black text-[#1A1A1A] tracking-tighter uppercase">
      Trending <span className="text-[#800000] font-serif italic lowercase font-normal tracking-normal">Keywords</span>
    </h4>
  </div>

  {/* Tags Container */}
  <ul className="flex flex-wrap gap-2 md:gap-3 list-none p-0">
    {merchantTags.map((tag: string, i: number) => {
      const isLongTag = tag.split(" ").length > 5;

      return (
        <li key={i} className="inline-block">
          <Link
            href={`/search?query=${tag}`}
            className={`
              group no-underline inline-flex items-center justify-center
              px-5 py-2 rounded-xl border border-[#800000]/10 
              bg-white text-slate-500 
              transition-all duration-500 ease-in-out
              hover:bg-[#800000] hover:border-[#800000] hover:text-[#FDFCF0]
              hover:shadow-[0_10px_20px_-5px_rgba(128,0,0,0.2)] 
              active:scale-95
            `}
          >
            <span
              className={`
                text-[11px] font-black uppercase tracking-widest
                ${isLongTag ? "whitespace-normal text-left max-w-[180px]" : "whitespace-nowrap"}
              `}
            >
              {tag}
            </span>
          </Link>
        </li>
      );
    })}
  </ul>
</div>
  );
};

export default TagsSidebar;
