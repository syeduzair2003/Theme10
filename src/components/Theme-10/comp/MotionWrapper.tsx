"use client";
import { motion } from "framer-motion";

// Interface for Reveal to support x, y, and delay
interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  x?: number;
  y?: number;
}

export const Reveal = ({ children, delay = 0, x = 0, y = 30 }: RevealProps) => (
  <motion.div
    initial={{ opacity: 0, y: y, x: x }}
    whileInView={{ opacity: 1, y: 0, x: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ 
      duration: 0.7, 
      delay: delay, 
      ease: [0.21, 0.47, 0.32, 0.98] 
    }}
  >
    {children}
  </motion.div>
);

// Scale + Blur effect for a different feel
export const ScaleReveal = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
    whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ 
      duration: 0.8, 
      delay: delay, 
      ease: [0.34, 1.56, 0.64, 1] 
    }}
  >
    {children}
  </motion.div>
);

// Perspective + Flip animation for Dark Mode sections
export const FlipReveal = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, rotateX: -20, y: 50 }}
    whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: delay, ease: [0.16, 1, 0.3, 1] }}
    style={{ perspective: "1000px" }}
  >
    {children}
  </motion.div>
);