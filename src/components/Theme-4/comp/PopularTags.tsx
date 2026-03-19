import { apiGetKeywords } from "@/apis/user";
import Link from "next/link";

interface PopularTagsProps {
    merchant_id: string;
    company_id: string;
}

const PopularTags = async ({ merchant_id, company_id }: PopularTagsProps) => {
    const response = await apiGetKeywords(merchant_id, company_id);
    const tags: string[] = response.data.merchant.meta_keywords
        ?.split(",")
        .map((tag: string) => tag.trim()) || [];

    if (!tags || tags.length === 0) return null;

    return (
        <section>
            <div className="flex flex-wrap gap-2">
                {tags.map((tag: string, index: number) => (
                    <Link
                        key={index}
                        href={`/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                        className="no-underline px-3 py-2 text-black bg-gray-100 rounded-lg text-sm font-medium hover:bg-[#e41717] hover:!text-white transition"
                    >
                        {tag}
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default PopularTags;
