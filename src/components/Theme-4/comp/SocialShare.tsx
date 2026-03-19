import Link from "next/link";
import { FaFacebook, FaTwitter, FaWhatsapp, FaLinkedin, FaTelegram } from "react-icons/fa";

interface SocialShareProps {
    href: string;
    title: string;
}

export default function SocialShare({ href, title }: SocialShareProps) {
    return (
        <div className="flex gap-2">
            {/* Facebook Share */}
            <Link
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    href || ""
                )}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                <FaFacebook className="h-5 w-5 text-blue-600 cursor-pointer hover:scale-125 hover:drop-shadow-md transition" />
            </Link>

            {/* Twitter Share */}
            <Link
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    href || ""
                )}&text=${encodeURIComponent(title)}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                <FaTwitter className="h-5 w-5 text-sky-500 cursor-pointer hover:scale-125 hover:drop-shadow-md transition" />
            </Link>

            {/* WhatsApp Share */}
            <Link
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                    `${title} - ${href}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                <FaWhatsapp className="h-5 w-5 text-green-500 cursor-pointer hover:scale-125 hover:drop-shadow-md transition" />
            </Link>

            {/* LinkedIn Share */}
            <Link
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    href || ""
                )}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                <FaLinkedin className="h-5 w-5 text-blue-700 cursor-pointer hover:scale-125 hover:drop-shadow-md transition" />
            </Link>

            {/* Telegram Share */}
            <Link
                href={`https://t.me/share/url?url=${encodeURIComponent(
                    href || ""
                )}&text=${encodeURIComponent(title)}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                <FaTelegram className="h-5 w-5 text-sky-600 cursor-pointer hover:scale-125 hover:drop-shadow-md transition" />
            </Link>
        </div>
    )
}