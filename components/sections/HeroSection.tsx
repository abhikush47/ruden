"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { FiChevronDown } from "react-icons/fi";

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070')",
        }}
      />
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span className="inline-block font-body text-accent uppercase tracking-[0.3em] text-xs sm:text-sm mb-6 border border-accent/30 px-5 py-2 rounded-full">
            Elite Personal Training
          </span>
        </motion.div>

        <motion.h1
          className="font-heading text-5xl sm:text-7xl lg:text-8xl xl:text-9xl tracking-wider leading-none"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Transform Your Body.
          <br />
          <span className="text-gradient">Build Elite Discipline.</span>
        </motion.h1>

        <motion.p
          className="mt-6 text-muted font-body text-base sm:text-lg lg:text-xl max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          Personalized coaching to help you unlock your strongest self.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <Button variant="primary" size="lg" href="/contact">
            Start Personal Training
          </Button>
          <Button variant="secondary" size="lg" href="/transformations">
            View Transformations
          </Button>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-muted text-xs uppercase tracking-widest font-body">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <FiChevronDown className="text-accent" size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
}