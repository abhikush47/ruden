"use client";

import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";

const programs = [
  {
    title: "Online Coaching",
    tagline: "Train from anywhere",
    features: [
      "Custom workout plan",
      "Nutrition guide",
      "Weekly check-ins",
      "Form correction via video",
      "24/7 chat support",
    ],
    cta: "Apply Now",
    featured: false,
  },
  {
    title: "Personal Training",
    tagline: "1-on-1 elite coaching",
    features: [
      "1-on-1 coaching sessions",
      "Posture correction",
      "Muscle building training",
      "Real-time form guidance",
      "Personalized progression",
    ],
    cta: "Book Consultation",
    featured: true,
  },
  {
    title: "90-Day Transformation",
    tagline: "Complete body overhaul",
    features: [
      "Workout program",
      "Nutrition strategy",
      "Progress tracking",
      "Body composition analysis",
      "Mindset coaching",
    ],
    cta: "Apply Now",
    featured: false,
  },
];

export default function ProgramCards() {
  return (
    <section className="section-padding bg-primary relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px]" />
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          title="Training Programs"
          subtitle="Choose the program that fits your goals and lifestyle"
        />
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
            >
              <GlassCard
                className={`relative h-full flex flex-col ${
                  program.featured ? "border-accent/50 gold-glow" : ""
                }`}
              >
                {program.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold-gradient text-primary text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="font-heading text-2xl sm:text-3xl tracking-wider text-white">
                    {program.title}
                  </h3>
                  <p className="text-accent text-sm font-body mt-1">
                    {program.tagline}
                  </p>
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  {program.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-gray-300 font-body text-sm"
                    >
                      <FiCheck className="text-accent flex-shrink-0" size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={program.featured ? "primary" : "outline"}
                  size="md"
                  href="/contact"
                  className="w-full justify-center"
                >
                  {program.cta}
                </Button>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}