"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import SectionHeading from "@/components/ui/SectionHeading";

const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Software Engineer",
    text: "Training with Rudrendra completely transformed my physique and confidence. His structured approach kept me on track throughout my 12-week journey.",
    rating: 5,
  },
  {
    id: 2,
    name: "Amit Patel",
    role: "Business Owner",
    text: "I tried multiple trainers before finding Ruden Fitness. Rudrendra doesn't just train your body — he builds your discipline and mindset.",
    rating: 5,
  },
  {
    id: 3,
    name: "Priya Mehta",
    role: "Marketing Manager",
    text: "As someone who was intimidated by the gym, Rudrendra made me feel comfortable and confident. I've never felt stronger or healthier.",
    rating: 5,
  },
  {
    id: 4,
    name: "Sanjay Kumar",
    role: "Student",
    text: "The 90-day transformation program changed my life. Not just physically, but the discipline I built has carried over into every area of my life.",
    rating: 5,
  },
];

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = () => {
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="section-padding bg-secondary relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-accent/5 rounded-full blur-[100px]" />
      <div className="max-w-4xl mx-auto relative z-10">
        <SectionHeading
          title="Client Testimonials"
          subtitle="Hear from those who've transformed with Ruden Fitness"
        />
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="glass rounded-lg p-8 sm:p-12 text-center"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: testimonials[current].rating }).map(
                  (_, i) => (
                    <span key={i} className="text-accent text-xl">
                      ★
                    </span>
                  )
                )}
              </div>
              <p className="text-gray-300 font-body text-lg sm:text-xl leading-relaxed italic mb-8">
                &ldquo;{testimonials[current].text}&rdquo;
              </p>
              <div>
                <h4 className="font-heading text-xl tracking-wider text-accent">
                  {testimonials[current].name}
                </h4>
                <p className="text-muted text-sm font-body">
                  {testimonials[current].role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center items-center gap-6 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-accent/30 flex items-center justify-center text-accent hover:bg-accent hover:text-primary transition-all duration-300"
            >
              <FiChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === current ? "bg-accent w-6" : "bg-muted/50"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-accent/30 flex items-center justify-center text-accent hover:bg-accent hover:text-primary transition-all duration-300"
            >
              <FiChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}