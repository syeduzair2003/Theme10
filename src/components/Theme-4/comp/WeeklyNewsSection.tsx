import Link from "next/link";
import { apiFooter } from "@/apis/user";
import Button from "./Button";
import { discardHTMLTags } from "@/constants/hooks";

interface WeeklyNewsSectionProps {
    companyId: string;
}

const WeeklyNewsSection = async ({ companyId }: WeeklyNewsSectionProps) => {
    const blog = (await apiFooter(companyId))?.data;

    if (!blog?.length) return null;

    return (
        <section className="py-10 md:py-16 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-[1200px] mx-auto px-4">
                {/* Section Title + Visit Blog */}
                <div className="relative mb-12">
                    {/* Title */}
                    <h2 className="md:text-center text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text 
    bg-gradient-to-r from-[var(--primary-color)] to-orange-500">
                        Weekly News
                    </h2>
                </div>


                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {blog?.slice(0, 3)?.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
                        >
                            <div className="p-8 flex flex-col flex-1">
                                {/* Title */}
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">{discardHTMLTags(item?.title)}</h3>

                                {/* Excerpt */}
                                <p className="text-gray-600 leading-relaxed line-clamp-3">{discardHTMLTags(item?.text)}</p>

                                {/* Actions */}
                                <div className="mt-auto pt-6">
                                    <Link
                                        href={item?.link || "#"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-5 py-2.5 rounded-lg bg-[var(--primary-color)] text-white text-sm font-medium shadow hover:bg-orange-600 transition-all"
                                    >
                                        Read More
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-10">
          <Button
            href="https://blog.gettopdiscounts.com"
            variant="ghost"
            className="btn-hover-gradient"
            label="Visit Blog"
          >
          </Button>
        </div>
            </div>
        </section>

    );
};

export default WeeklyNewsSection;
