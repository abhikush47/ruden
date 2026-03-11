"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";

const transformations = [
  {
    id: 1,
    name: "Rahul S.",
    duration: "12 Weeks",
    description:
      "Lost 15kg and built lean muscle mass through structured training.",
    beforeImage:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=600",
    afterImage:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=600",
  },
  {
    id: 2,
    name: "Amit K.",
    duration: "16 Weeks",
    description:
      "Gained 8kg of muscle with customized nutrition and training.",
    beforeImage:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=600",
    afterImage:
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=600",
  },
  {
    id: 3,
    name: "Priya M.",
    duration: "10 Weeks",
    description:
      "Complete body recomposition with strength and confidence gains.",
    beforeImage:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600",
    afterImage:
      "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=600",
  },
];

export default function TransformationGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <section className="section-padding bg-secondary relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-[100px]" />
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Transformation Results"
          subtitle="Real people. Real results. See the proof."
        />
        <ScrollReveal>
          <div className="max-w-3xl mx-auto mb-16">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden gold-border">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('${transformations[activeIndex].beforeImage}')`,
                }}
              />
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('${transformations[activeIndex].afterImage}')`,
                  clipPath: `inset(0 0 0 ${sliderPosition}%)`,
                }}
              />
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-accent z-10"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                  <span className="text-primary text-lg font-bold">⟷</span>
                </div>
              </div>
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded text-xs uppercase tracking-wider font-body">
                Before
              </div>
              <div className="absolute top-4 right-4 bg-accent/90 px-3 py-1 rounded text-xs uppercase tracking-wider font-body text-primary">
                After
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
              />
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                className="mt-6 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <h3 className="font-heading text-2xl tracking-wider text-accent">
                  {transformations[activeIndex].name}
                </h3>
                <p className="text-muted text-sm mt-1 font-body">
                  {transformations[activeIndex].duration} Transformation
                </p>
                <p className="text-gray-400 text-sm mt-2 font-body">
                  {transformations[activeIndex].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </ScrollReveal>
        <div className="flex justify-center gap-4">
          {transformations.map((t, i) => (
            <motion.button
              key={t.id}
              onClick={() => {
                setActiveIndex(i);
                setSliderPosition(50);
              }}
              className={`relative w-20 h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                i === activeIndex
                  ? "ring-2 ring-accent scale-110"
                  : "opacity-50 hover:opacity-80"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url('${t.afterImage}')` }}
              />
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}