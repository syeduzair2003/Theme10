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
    <div className="group relative bg-[#1A1A1A] rounded-[2.5rem] p-8 border border-[#FFFDF5]/5 hover:border-[#800000]/30 hover:bg-[#1E1E1E] hover:shadow-[0_20px_60px_rgba(128,0,0,0.1)] transition-all duration-500 flex flex-col h-full overflow-hidden">
      {/* Date Badge */}
      <div className="flex items-center gap-2 text-[#FFFDF5]/40 mb-6 group-hover:text-[#ffe1e1] transition-colors duration-300 ease-in-out font-medium tracking-wide">
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
            className="no-underline text-2xl font-black !text-[#FFFDF5] mb-4 leading-tight group-hover:!text-[#800000] transition-colors duration-300 line-clamp-2"
          >
            {discardHTMLTags(data?.title)}
          </Link>
        </h4>

        <p className="text-[#FFFDF5]/60 leading-relaxed mb-6 line-clamp-3 text-sm font-medium tracking-wide group-hover:text-[#FFFDF5]/80 transition-colors duration-300">
          {discardHTMLTags(data?.text)}
        </p>
      </div>

      {/* Footer / Read More */}
      <div className="pt-6 border-t border-gray-100">
        <Link
          href={data?.link}
          className="no-underline inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-[#fcb6b6] group-hover:gap-4 group-hover:text-[#FFFDF5] transition-all duration-300"
        >
          Read Full Story
          <ChevronRight
            size={16}
            className="text-[#800000] drop-shadow-[0_0_8px_rgba(128,0,0,0.4)]"
          />
        </Link>
      </div>

      {/* Subtle Gradient Glow (on hover) */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 rounded-[2rem] pointer-events-none transition-opacity"></div>
    </div>
  );
};

export default Blog;
