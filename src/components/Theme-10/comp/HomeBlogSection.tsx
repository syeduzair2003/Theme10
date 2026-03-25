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
      <section className="bg-[#1A1A1A] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Area */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div className="max-w-2xl">
              <p className="text-[#800000] font-bold text-xs mb-3 uppercase tracking-[0.2em]">
                Stay Updated
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-[#FFFDF5] tracking-tighter">
                Weekly{" "}
                <span className="text-[#800000] drop-shadow-[0_0_10px_rgba(128,0,0,0.3)]">
                  News & Insights
                </span>
              </h2>
            </div>

            <Link
              href={blog_url}
              className="group flex items-center gap-2 text-sm font-black uppercase tracking-[0.25em] text-[#FFFDF5]/60 hover:text-[#800000] transition-all duration-300"
            >
              View All News
              <ArrowRight
                size={18}
                className="text-[#800000] group-hover:translate-x-2 transition-transform duration-300"
              />
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
