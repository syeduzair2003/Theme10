import Image from "next/image";
import Link from "next/link"


interface VerticalBannerProps {
    url?: string;
    image?: string | null;
}

export default function VerticalBanner({ url, image }: VerticalBannerProps) {
    return (
        <div className="rounded-xl py-3">
            <Link
                href={`/${url}`}>
                <Image
                width={200}
                height={200}
                    src={`${image}`}
                    alt="Banner"
                    className="w-full h-auto object-cover"
                />
            </Link>
        </div>
    )
}