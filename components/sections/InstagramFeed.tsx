"use client";

import { motion } from "framer-motion";
import { FiInstagram } from "react-icons/fi";
import SectionHeading from "@/components/ui/SectionHeading";

const instagramPosts = [
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400",
  "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=400",
  "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=400",
  "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=400",
  "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=400",
  "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=400",
];

export default function InstagramFeed() {
  return (
    <section className="section-padding bg-primary relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Follow The Journey"
          subtitle="Daily motivation, training tips, and behind the scenes"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {instagramPosts.map((post, index) => (
            <motion.a
              key={index}
              href="https://instagram.com/ruden_s"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-lg overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('${post}')` }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-500 flex items-center justify-center">
                <FiInstagram
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  size={32}
                />
              </div>
            </motion.a>
          ))}
        </div>
        <div className="text-center mt-10">
          <a
            href="https://instagram.com/ruden_s"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent font-body text-sm uppercase tracking-wider hover:text-accent-light transition-colors"
          >
            <FiInstagram size={18} />
            @ruden_s
          </a>
        </div>
      </div>
    </section>
  );
}