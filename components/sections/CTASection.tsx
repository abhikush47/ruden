"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { FiMessageCircle } from "react-icons/fi";

export default function CTASection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070')",
        }}
      />
      <div className="absolute inset-0 bg-primary/90" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.span
          className="inline-block text-accent text-sm uppercase tracking-[0.3em] font-body mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Your Transformation Awaits
        </motion.span>
        <motion.h2
          className="font-heading text-4xl sm:text-6xl lg:text-7xl tracking-wider"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Start Your Transformation{" "}
          <span className="text-gradient">Today</span>
        </motion.h2>
        <motion.p
          className="mt-6 text-muted font-body text-lg max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Take the first step towards the body and discipline you deserve.
          Limited spots available for personal training.
        </motion.p>
        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Button variant="primary" size="lg" href="/contact">
            Book Consultation
          </Button>
          <Button
            variant="secondary"
            size="lg"
            href="https://wa.me/919999999999?text=Hi%20Rudrendra%2C%20I%27m%20interested%20in%20personal%20training"
          >
            <FiMessageCircle className="mr-2" size={18} />
            Chat on WhatsApp
          </Button>
        </motion.div>
      </div>
    </section>
  );
}