
import { getLastUpdateDate } from "@/constants/hooks";
import Image from "next/image";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";
import RenderRating from "./RenderRating";

interface BannerProps {
    title?: string;
    slug?: string | string[];
    breadcrumbs: { label: string; href?: string }[];
    image?: string;
    logo?: string;
    rating?: number;
    variant?: "default" | "light" | "offers";
    description?: string;
    readMoreTarget?: string;
}

export default function PageBanner({
    title,
    slug,
    image,
    logo,
    rating,
    breadcrumbs,
    variant = "default",
    description,
    readMoreTarget
}: BannerProps) {
    const isLight = variant === "light";
    const isOffers = variant === "offers";

    const sectionClasses = isOffers
        ? "bg-gradient-to-r from-orange-50 via-white to-orange-100 text-slate-900 border-b border-gray-200 pb-6"
        : isLight
            ? "bg-gray-50 text-slate-800 border-b border-gray-200"
            : "bg-gradient-to-r from-[#f73a17] via-[#fb4717] to-[#e71c17] text-white";

    const titleClasses = isLight
        ? "text-2xl md:text-3xl font-bold text-slate-900"
        : "text-2xl md:text-4xl font-bold";

    const breadcrumbClasses = isOffers
        ? "text-sm mt-3 flex flex-wrap md:justify-start gap-2 text-slate-700"
        : isLight
            ? "text-sm mt-3 flex flex-wrap md:justify-start gap-2 text-slate-600"
            : "text-sm mt-3 flex flex-wrap md:justify-start gap-2 text-white/80";

    const hoverClasses = isOffers
        ? "hover:text-orange-600"
            
        : isLight
            ? "hover:text-[var(--primary-color)]"
            : "hover:text-white no-underline text-white/90";

    return (
        <section className={`w-full px-1 md:px-20 ${sectionClasses}`}>
            <div className="container mx-auto">
                {isOffers ? (
                    <div className="py-4 px-3">
                        {/* Breadcrumbs always at the top */}
                        <nav className={breadcrumbClasses}>
                            {breadcrumbs.map((bc, idx) => (
                                <span key={idx} className="capitalize flex items-center gap-2">
                                    {bc.href ? (
                                        <Link href={bc.href} className={hoverClasses}>
                                            {bc.label}
                                        </Link>
                                    ) : (
                                        <span>{bc.label}</span>
                                    )}
                                    {idx < breadcrumbs.length - 1 && <FaAngleRight />}
                                </span>
                            ))}
                        </nav>
                    </div>
                ) : (
                    <div></div>
                )}
                {/* OFFERS VARIANT */}
                {isOffers ? (
                    <div className="flex flex-col sm:flex-row items-center sm:items-start bg-white/80 rounded-2xl shadow-md p-6 border border-gray-100">
                        {/* Logo on the left */}
                        {logo && (
                            <div className="relative w-32 h-32 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-lg flex items-center justify-center">
                                <Image
                                    src={`/${logo}`}
                                    alt={title || "Merchant"}
                                    fill
                                    className="object-contain p-6"
                                    priority
                                />
                            </div>
                        )}

                        {/* Right side content */}
                        <div className="mt-6 sm:mt-0 sm:ml-8 text-center sm:text-left flex-1">
                            {/* Title */}
                            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                                {title}
                            </h1>

                            {/* Rating */}
                            <div className="mt-3 flex justify-center sm:justify-start items-center gap-2">
                                {rating && (
                                    <div className="text-xl sm:text-2xl text-yellow-500">
                                        <RenderRating rating={rating} />
                                    </div>
                                )}
                                <span className="text-[15px] font-medium text-slate-700 bg-orange-100 px-2 py-0.5 rounded-md">
                                    {rating}
                                </span>
                            </div>

                            {/* Verified message */}
                            <p className="mt-3 text-[15px] text-slate-700 leading-relaxed">
                                ✅ All coupons and deals on this page are{" "}
                                <span className="font-semibold text-slate-900">verified</span>. <br />
                                Last checked:{" "}
                                <span className="font-medium text-orange-600">
                                    {getLastUpdateDate(1)}
                                </span>
                            </p>
                            {/* Store short description + Read More link */}
                            {description && (
                                <p className="mt-3 text-[15px] text-slate-700 leading-relaxed">
                                    {description}
                                    {readMoreTarget && (
                                        <>
                                            {" "}
                                            <Link
                                                href={`#${readMoreTarget}`}
                                                className="text-orange-600 font-semibold hover:underline ml-1"
                                            >
                                                Read More
                                            </Link>
                                        </>
                                    )}
                                </p>
                            )}
                        </div>
                    </div>
                ) : (
                    // DEFAULT + LIGHT VARIANTS
                    <div className="flex justify-between">
                        <div className="px-1 md:px-4 py-3 md:py-8">
                            {/* Breadcrumbs always at the top */}
                            <nav className={breadcrumbClasses}>
                                {breadcrumbs.map((bc, idx) => (
                                    <span key={idx} className="capitalize flex items-center gap-2">
                                        {bc.href ? (
                                            <Link href={bc.href} className={hoverClasses}>
                                                {bc.label}
                                            </Link>
                                        ) : (
                                            <span>{bc.label}</span>
                                        )}
                                        {idx < breadcrumbs.length - 1 && <FaAngleRight />}
                                    </span>
                                ))}
                            </nav>
                            <h1 className={`mt-4 ${titleClasses}`}>{title}</h1>
                        </div>

                        {image && (
                            <div className="relative w-[220px] h-[160px] md:w-[260px] md:h-[200px]">
                                <Image
                                    src={image}
                                    alt={title || "Banner"}
                                    fill
                                    className="object-contain drop-shadow-lg"
                                    priority
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
