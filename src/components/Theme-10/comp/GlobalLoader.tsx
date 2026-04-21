"use client";
import { motion } from "framer-motion";
import Image from "next/image";

interface GlobalLoaderProps {
  logo?: string;
}

const GlobalLoader = ({ logo }: GlobalLoaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#FDFCF0]"
    >
      <div className="relative flex flex-col items-center">
        
        {/* 1. Logo Animation: Floating & Scaling */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: [0.8, 1.1, 1],
            opacity: 1 
          }}
          transition={{ 
            duration: 1.2, 
            ease: "easeOut",
            times: [0, 0.6, 1]
          }}
          className="relative w-32 h-32 md:w-40 md:h-40 mb-8"
        >
          {logo && (
            <Image
              src={logo}
              alt="Elite Logo"
              fill
              className="object-contain"
              priority
            />
          )}
          
          {/* 2. Soft Outer Glow Ring */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.5, 0.2] 
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute inset-0 rounded-full bg-[#800000]/5 blur-2xl -z-10"
          />
        </motion.div>

        {/* 3. Elegant Progress Text & Line */}
        <div className="flex flex-col items-center gap-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-[10px] font-black uppercase tracking-[0.6em] text-[#800000]/80"
          >
            Establishing Quality
          </motion.span>

          {/* 4. Minimalist Loading Bar */}
          <div className="w-32 h-[1.5px] bg-[#800000]/5 rounded-full overflow-hidden relative">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#800000] to-transparent"
            />
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default GlobalLoader;