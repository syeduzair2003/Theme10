interface BadgeProps {
    timeLeft?: string;
}

export default function Badge({ timeLeft }: BadgeProps) {
    return (
        <span className="absolute top-2 right-2 bg-[var(--primary-color)] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg group-hover:scale-110 transition-transform">
            {timeLeft}
        </span>
    )
}