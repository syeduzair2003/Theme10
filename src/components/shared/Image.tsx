import React from 'react'

type ImageProps = {
    src: string;
    height?: number;
    width?: number;
    className?: string;
    layout?: string;
    alt: string;
    objectFit?: "fill" | "contain" | "cover" | "none" | "scale-down";
    style?: React.CSSProperties;
    loading?: "eager" | "lazy" | undefined;
    onLoad?: () => void;
    priority?: boolean;
    fetchPriority?: "low" | "auto" | "high";
}
const Image = ({ src, height, width, className, layout, alt, objectFit, style, loading, onLoad, priority, fetchPriority }: ImageProps) => {
    const responsiveStyle =
        layout === "responsive"
            ? { width: "100%", height: "auto", objectFit, ...style }
            : { objectFit, ...style };
    return (
        <img
            src={src}
            alt={alt}
            height={height}
            width={width}
            className={className}
            style={responsiveStyle}
            loading={loading}
            onLoad={onLoad}
            fetchPriority={fetchPriority}
        />

    );
};

export default Image;

