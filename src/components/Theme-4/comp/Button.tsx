import React from "react";
import Link from "next/link";
import clsx from "clsx";

interface ButtonProps {
    href?: string;
    onClick?: () => void;
    label?: React.ReactNode;
    variant?: "primary" | "secondary" | "ghost";
    size?: "sm" | "md" | "lg";
    className?: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}

const Button = ({
    href,
    onClick,
    label,
    variant = "primary",
    className = "",
    size = "md",
    type = "button",
    disabled = false,
}: ButtonProps) => {
    const baseClasses =
        "inline-flex text-sm font-medium text-center no-underline rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer";

    const variants = {
        primary:
            "bg-[var(--primary-color)] text-white hover:brightness-110 focus:ring-[var(--primary-color)]",
        secondary:
            "bg-white text-gray-700 border border-gray-300",
        ghost:
            "bg-white text-[var(--primary-color)] border border-[var(--primary-color)] hover:bg-red-50 focus:ring-[var(--primary-color)]",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-xs rounded-md",
        md: "px-5 py-2 text-sm rounded-lg",
        lg: "px-7 py-3 text-base rounded-xl",
    };


    const disabledClasses =
        "opacity-50 cursor-not-allowed hover:brightness-100 hover:shadow-none";

    const classes = clsx(
        baseClasses,
        variants[variant],
        sizes[size],
        disabled && disabledClasses,
        className
    );

    if (href) {
        return (
            <Link href={href} className={classes} aria-disabled={disabled}>
                {label}
            </Link>
        );
    }

    return (
        <button
            onClick={onClick}
            className={classes}
            type={type}
            disabled={disabled}
        >
            {label}
        </button>
    );
};

export default Button;
