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

  // 1. Hydration Error Fix: Sirf client-side par render hone ke liye
  useEffect(() => {
    setMounted(true);
    
    // Pehli baar jab site khule
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // 1.5 seconds ka delay premium feel ke liye

    return () => clearTimeout(timer);
  }, []);

  // 2. Route Change Logic: Jab user links click kare
  useEffect(() => {
    if (mounted) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 800); // Route change par chota loader
      
      return () => clearTimeout(timer);
    }
  }, [pathname, mounted]);

  // 3. Body Scroll Lock: Loader ke peeche scrolling band karne ke liye
  useEffect(() => {
    if (loading && mounted) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [loading, mounted]);

  // Server-side rendering ke waqt kuch na dikhao (mismatch se bachne ke liye)
  if (!mounted) return null;

  // Agar loading khatam ho jaye toh component hide kar do
  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[10000]">
      <GlobalLoader logo={logo || ""} />
    </div>
  );
}