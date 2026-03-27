import { apiFooter } from "@/apis/user";
import Link from "next/link";
import React from "react";
import Blog from "./Blog";
import { ArrowRight } from "lucide-react";

const HomeBlogSection = async ({
  companyId,
  blog_url,
}: {
  companyId: string;
  blog_url: string;
}) => {
  const blog = await apiFooter(companyId);

  if (blog.status && blog?.data?.length > 0) {
    return (
      <section className="bg-[#fffde0] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Area */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div className="max-w-2xl">
              <p className="text-[#800000] font-bold text-xs mb-3 uppercase tracking-[0.2em]">
                Stay Updated
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] tracking-tighter leading-[1.1]">
                Weekly <span className="text-[#800000]">News & Insights</span>
              </h2>
            </div>

            <Link
              href={blog_url}
              className="group relative flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.35em] text-[#1A1A1A]/60 hover:text-[#800000] transition-all duration-500"
            >
              <span className="relative">
                View All News
                {/* Animated Underline */}
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#800000] transition-all duration-500 group-hover:w-full"></span>
              </span>

              <div className="relative flex items-center justify-center w-8 h-8 rounded-full border border-[#800000]/10 bg-[#800000]/0 group-hover:bg-[#800000] group-hover:border-[#800000] group-hover:shadow-[0_0_15px_rgba(128,0,0,0.3)] transition-all duration-500">
                <ArrowRight
                  size={14}
                  className="text-[#800000] group-hover:text-[#FFFDF5] group-hover:translate-x-0.5 transition-all duration-500"
                />
              </div>
            </Link>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blog.data.slice(0, 3).map((item: any, i: number) => (
              <Blog key={i} data={item} />
            ))}
          </div>
        </div>
      </section>
    );
  }
  return null;
};

export default HomeBlogSection;
