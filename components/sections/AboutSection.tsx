"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";

const stats = [
  { value: "100+", label: "Clients Coached" },
  { value: "5+", label: "Years Experience" },
  { value: "MPA", label: "Men's Physique Athlete" },
];

export default function AboutSection() {
  return (
    <section className="section-padding bg-primary relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Meet Your Coach"
          subtitle="Dedicated to transforming lives through discipline and elite training"
        />
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <ScrollReveal direction="left">
            <div className="relative">
              <div className="aspect-[3/4] rounded-lg overflow-hidden gold-border">
                <div
                  className="w-full h-full bg-cover bg-center bg-no-repeat hover:scale-105 transition-transform duration-700"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=2070')",
                  }}
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-accent/30 rounded-lg" />
              <div className="absolute -top-4 -left-4 w-16 h-16 border-2 border-accent/20 rounded-lg" />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div>
              <h3 className="font-heading text-3xl sm:text-4xl tracking-wider text-accent mb-2">
                Rudrendra Shrestha
              </h3>
              <p className="text-muted text-sm uppercase tracking-widest mb-6 font-body">
                Personal Trainer &amp; Men&apos;s Physique Athlete
              </p>
              <p className="text-gray-300 font-body text-base leading-relaxed mb-4">
                Rudrendra Shrestha is a men&apos;s physique athlete and personal
                trainer dedicated to helping people transform their bodies
                through disciplined training, structured programs, and mindset
                development.
              </p>
              <p className="text-gray-400 font-body text-base leading-relaxed mb-10">
                With over 5 years of experience in the fitness industry and a
                personal journey from a beginner to a competitive athlete,
                Rudrendra understands what it takes to build an extraordinary
                physique.
              </p>
              <div className="grid grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="text-center lg:text-left"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                  >
                    <div className="font-heading text-3xl sm:text-4xl text-accent tracking-wider">
                      {stat.value}
                    </div>
                    <div className="text-muted text-xs uppercase tracking-wider mt-1 font-body">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}