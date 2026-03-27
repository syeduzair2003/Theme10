import { discardHTMLTags } from "@/constants/hooks";
import { FooterResponse } from "@/services/dataTypes";
import Link from "next/link";
import React from "react";
import { Calendar, ChevronRight } from "lucide-react";

interface Props {
  data: FooterResponse;
}

const Blog = ({ data }: Props) => {
  return (
    <div className="group relative bg-[#FFFDF5] rounded-[2.5rem] p-8 border border-[#800000]/10 hover:border-[#800000]/30 hover:bg-white hover:shadow-[0_20px_50px_rgba(128,0,0,0.06)] transition-all duration-500 flex flex-col h-full overflow-hidden">
      {/* Date Badge */}
      <div className="flex items-center gap-2 text-[#1A1A1A]/50 mb-6 group-hover:text-[#800000] transition-colors duration-300 ease-in-out font-semibold tracking-wider text-xs uppercase">
        <Calendar size={16} />
        <span className="text-xs font-bold uppercase tracking-widest">
          {data?.date || "Recent Post"}
        </span>
      </div>

      {/* Content */}
      <div className="flex-grow">
        <h4 className="">
          <Link
            href={data?.link}
            className="no-underline text-2xl font-black !text-[#1A1A1A] mb-4 leading-tight group-hover:!text-[#800000] transition-colors duration-300 line-clamp-2"
          >
            {discardHTMLTags(data?.title)}
          </Link>
        </h4>

        <p className="text-[#1A1A1A]/60 leading-relaxed mb-6 line-clamp-3 text-sm font-medium tracking-wide group-hover:text-[#1A1A1A]/90 transition-colors duration-300">
          {discardHTMLTags(data?.text)}
        </p>
      </div>

      {/* Footer / Read More */}
      <div className="pt-6 border-t border-[#800000]/10 group-hover:border-[#800000]/30 transition-colors duration-500">
        <Link
          href={data?.link}
          className="no-underline inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#1A1A1A]/50 group-hover:gap-4 group-hover:text-[#800000] transition-all duration-300"
        >
          Read Full Story
          <ChevronRight
            size={14}
            className="text-[#800000] transition-transform duration-300"
          />
        </Link>
      </div>

      {/* Subtle Gradient Glow (on hover) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#800000]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 rounded-[2.5rem] pointer-events-none transition-opacity duration-700"></div>
    </div>
  );
};

export default Blog;
