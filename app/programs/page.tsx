"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheck, FiChevronDown } from "react-icons/fi";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";

const programs = [
  { id: "online", title: "Online Coaching", tagline: "Train from anywhere", description: "Fully customized training and nutrition plan delivered to your phone.", features: ["Personalized workout program", "Custom nutrition & meal plan", "Weekly video check-ins", "Form correction via video", "24/7 WhatsApp support", "Progress tracking dashboard", "Monthly program adjustments"], ideal: "Motivated individuals who can train independently.", cta: "Apply Now" },
  { id: "personal", title: "Personal Training", tagline: "1-on-1 elite coaching", description: "Train directly with Rudrendra in person for maximum results.", features: ["1-on-1 in-person sessions", "Real-time form correction", "Posture assessment", "Progressive strength training", "Custom nutrition strategy", "Body composition tracking", "Mindset coaching"], ideal: "Anyone who wants the fastest results.", cta: "Book Consultation", featured: true },
  { id: "transformation", title: "90-Day Transformation", tagline: "Complete body overhaul", description: "Intensive 90-day program for dramatic, visible results.", features: ["Complete workout program (3 phases)", "Detailed nutrition strategy", "Weekly progress tracking", "Body composition analysis", "Supplement guidance", "Mindset coaching", "Before/After photoshoot"], ideal: "Committed individuals ready for dramatic change.", cta: "Apply Now" },
];

const faqs = [
  { q: "How do I get started?", a: "Click 'Apply Now' or 'Book Consultation'. Fill out a brief application and Rudrendra will reach out personally." },
  { q: "Do I need gym experience?", a: "Not at all! Programs are tailored to your fitness level." },
  { q: "How are online check-ins done?", a: "Via video call or WhatsApp with progress photos and measurements." },
  { q: "Can I switch programs?", a: "Yes! We can adjust your program as your goals change." },
  { q: "What results can I expect?", a: "Noticeable changes within 4-6 weeks with consistent effort." },
  { q: "Is nutrition guidance included?", a: "Yes, all programs include personalized nutrition guidance." },
];

export default function ProgramsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="pt-24">
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070')" }} />
        <div className="absolute inset-0 bg-primary/85" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.h1 className="font-heading text-5xl sm:text-7xl tracking-wider" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            Training <span className="text-gradient">Programs</span>
          </motion.h1>
        </div>
      </section>

      <section className="section-padding bg-primary">
        <div className="max-w-7xl mx-auto space-y-16">
          {programs.map((program, index) => (
            <ScrollReveal key={program.id}>
              <div className={`glass rounded-lg overflow-hidden ${program.featured ? "gold-border gold-glow" : ""}`}>
                {program.featured && <div className="bg-gold-gradient text-primary text-center py-2 font-body text-xs font-bold uppercase tracking-widest">Most Popular Choice</div>}
                <div className="p-8 lg:p-12">
                  <div className="grid lg:grid-cols-2 gap-12">
                    <div>
                      <span className="text-accent text-xs uppercase tracking-[0.3em] font-body">Program {String(index + 1).padStart(2, "0")}</span>
                      <h2 className="font-heading text-4xl sm:text-5xl tracking-wider mt-2">{program.title}</h2>
                      <p className="text-accent font-body text-sm mt-1">{program.tagline}</p>
                      <p className="text-gray-300 font-body mt-6 leading-relaxed">{program.description}</p>
                      <div className="mt-6 p-4 rounded-lg bg-accent/5 border border-accent/10">
                        <p className="text-xs text-accent uppercase tracking-wider font-body mb-1">Ideal For</p>
                        <p className="text-gray-400 font-body text-sm">{program.ideal}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-heading text-xl tracking-wider text-white mb-4">What&apos;s Included</h3>
                      <ul className="space-y-3 mb-8">
                        {program.features.map((f) => (
                          <li key={f} className="flex items-center gap-3 text-gray-300 font-body text-sm">
                            <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0"><FiCheck className="text-accent" size={12} /></div>{f}
                          </li>
                        ))}
                      </ul>
                      <Button variant={program.featured ? "primary" : "outline"} size="lg" href="/contact" className="w-full justify-center">{program.cta}</Button>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="section-padding bg-primary">
        <div className="max-w-3xl mx-auto">
          <SectionHeading title="Frequently Asked Questions" />
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <motion.div key={index} className="glass rounded-lg overflow-hidden" initial={false}>
                <button className="w-full flex items-center justify-between p-6 text-left" onClick={() => setOpenFaq(openFaq === index ? null : index)}>
                  <span className="font-body text-white text-sm pr-4">{faq.q}</span>
                  <motion.div animate={{ rotate: openFaq === index ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <FiChevronDown className="text-accent flex-shrink-0" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                      <div className="px-6 pb-6"><p className="text-muted font-body text-sm leading-relaxed">{faq.a}</p></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}