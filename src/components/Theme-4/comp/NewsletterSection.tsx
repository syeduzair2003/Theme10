"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { subscribeNewsLetter } from "../../../app/actions/newsletter";
import NewsletterForm from "./NewsLetterForm";
import Icon3 from "@theme3/assets/img/newsletter/newsletter-icon-3.png"
import Icon5 from "@theme3/assets/img/newsletter/newsletter-icon-5.png"

interface NewsletterProps {
  company_id: string;
}

export default function NewsletterSection({ company_id }: NewsletterProps) {
  return (
    <section className="relative py-16 md:py-20 overflow-hidden bg-gradient-to-r from-[#f73a17] via-[#fb4717] to-[#e71c17] text-white">
      {/* Background Decorative Elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute top-[-50px] left-[-50px] w-64 h-64 bg-white rounded-full mix-blend-overlay blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
        className="absolute bottom-[-80px] right-[-80px] w-72 h-72 bg-yellow-400 rounded-full mix-blend-overlay blur-3xl"
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        {/* Heading */}
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-2xl md:text-4xl font-extrabold mb-4"
        >
          Join Our Newsletter
        </motion.h2>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-md md:text-lg text-white/90 mb-8"
        >
          Be the first to know about exclusive deals, new products, and special offers delivered straight to your inbox.
        </motion.p>

        {/* Subscription Form */}
                <NewsletterForm company_id={company_id} onSubmit={subscribeNewsLetter} />

      </div>

      {/* Floating Decorative Images */}
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 20 }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: 3 }}
        className="absolute top-10 right-10 w-24 h-24 opacity-80"
      >
        <Image src={Icon5} alt="decor" fill className="object-contain" />
      </motion.div>

      <motion.div
        initial={{ y: 20 }}
        animate={{ y: -20 }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: 4 }}
        className="absolute bottom-10 left-10 w-28 h-28 opacity-80"
      >
        <Image src={Icon3} alt="decor" fill className="object-contain" />
      </motion.div>
    </section>
  );
}
