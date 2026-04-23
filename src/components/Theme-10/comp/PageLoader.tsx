"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import GlobalLoader from "./GlobalLoader"; // Check karlo path sahi ho

interface PageLoaderProps {
  logo?: string;
}

export default function PageLoader({ logo }: PageLoaderProps) {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // 1.5 seconds delay

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (mounted) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 800); 

      return () => clearTimeout(timer);
    }
  }, [pathname, mounted]);

  useEffect(() => {
    if (loading && mounted) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [loading, mounted]);

  if (!mounted) return null;

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[10000]">
      <GlobalLoader logo={logo || ""} />
    </div>
  );
}
