"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";

const transformations = [
  { id: 1, name: "Rahul S.", age: 28, duration: "12 Weeks", category: "Fat Loss", description: "Lost 15kg of body fat while building lean muscle.", stats: { weightLost: "15kg", muscleGained: "4kg", bodyFatChange: "-12%" }, beforeImage: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=600", afterImage: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=600", testimonial: "Rudrendra changed my life." },
  { id: 2, name: "Amit K.", age: 32, duration: "16 Weeks", category: "Muscle Building", description: "Gained 8kg of quality muscle.", stats: { weightLost: "2kg fat", muscleGained: "8kg", bodyFatChange: "-5%" }, beforeImage: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=600", afterImage: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=600", testimonial: "First thing that actually worked for my body type." },
  { id: 3, name: "Priya M.", age: 26, duration: "10 Weeks", category: "Recomposition", description: "Complete body recomposition.", stats: { weightLost: "6kg fat", muscleGained: "3kg", bodyFatChange: "-8%" }, beforeImage: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600", afterImage: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=600", testimonial: "I never thought I could look and feel this good." },
];

const categories = ["All", "Fat Loss", "Muscle Building", "Recomposition"];

export default function TransformationsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedTransformation, setSelectedTransformation] = useState<(typeof transformations)[0] | null>(null);
  const [sliderPositions, setSliderPositions] = useState<Record<number, number>>({});

  const filtered = activeCategory === "All" ? transformations : transformations.filter((t) => t.category === activeCategory);

  return (
    <div className="pt-24">
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070')" }} />
        <div className="absolute inset-0 bg-primary/85" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.h1 className="font-heading text-5xl sm:text-7xl tracking-wider" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            Client <span className="text-gradient">Transformations</span>
          </motion.h1>
          <motion.p className="mt-4 text-muted font-body text-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            Real results from real people.
          </motion.p>
        </div>
      </section>

      <section className="py-8 bg-secondary border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 flex justify-center gap-3 flex-wrap">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-6 py-2 rounded-full font-body text-sm uppercase tracking-wider transition-all duration-300 ${activeCategory === cat ? "bg-accent text-primary" : "border border-accent/30 text-muted hover:border-accent hover:text-accent"}`}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="section-padding bg-primary">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div key={activeCategory} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {filtered.map((t, index) => (
                <ScrollReveal key={t.id} delay={index * 0.1}>
                  <div className="glass rounded-lg overflow-hidden cursor-pointer group" onClick={() => setSelectedTransformation(t)}>
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${t.beforeImage}')` }} />
                      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${t.afterImage}')`, clipPath: `inset(0 0 0 ${sliderPositions[t.id] ?? 50}%)` }} />
                      <input type="range" min="0" max="100" value={sliderPositions[t.id] ?? 50} onChange={(e) => setSliderPositions((prev) => ({ ...prev, [t.id]: Number(e.target.value) }))} onClick={(e) => e.stopPropagation()} className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20" />
                      <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-[10px] uppercase tracking-wider">Before</div>
                      <div className="absolute top-3 right-3 bg-accent/90 px-2 py-1 rounded text-[10px] uppercase tracking-wider text-primary">After</div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-heading text-xl tracking-wider text-white">{t.name}</h3>
                        <span className="text-accent text-xs font-body uppercase">{t.duration}</span>
                      </div>
                      <span className="text-xs text-muted font-body uppercase tracking-wider">{t.category}</span>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <AnimatePresence>
        {selectedTransformation && (
          <motion.div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedTransformation(null)}>
            <motion.div className="glass rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="font-heading text-3xl tracking-wider text-accent">{selectedTransformation.name}</h2>
                  <p className="text-muted text-sm font-body">Age {selectedTransformation.age} • {selectedTransformation.duration} • {selectedTransformation.category}</p>
                </div>
                <button onClick={() => setSelectedTransformation(null)} className="text-muted hover:text-white text-2xl">×</button>
              </div>
              <p className="text-gray-300 font-body leading-relaxed mb-6">{selectedTransformation.description}</p>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {Object.entries(selectedTransformation.stats).map(([key, value]) => (
                  <div key={key} className="text-center p-3 rounded-lg bg-accent/10">
                    <div className="font-heading text-xl text-accent">{value}</div>
                    <div className="text-muted text-xs uppercase tracking-wider font-body mt-1">{key.replace(/([A-Z])/g, " $1").trim()}</div>
                  </div>
                ))}
              </div>
              <blockquote className="border-l-2 border-accent pl-4 italic text-gray-400 font-body">&ldquo;{selectedTransformation.testimonial}&rdquo;</blockquote>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="section-padding bg-secondary text-center">
        <ScrollReveal>
          <h2 className="font-heading text-4xl sm:text-5xl tracking-wider">Be The Next <span className="text-gradient">Success Story</span></h2>
          <div className="mt-8"><Button variant="primary" size="lg" href="/contact">Start Your Transformation</Button></div>
        </ScrollReveal>
      </section>
    </div>
  );
}