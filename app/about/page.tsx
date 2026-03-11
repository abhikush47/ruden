"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

const milestones = [
  { year: "2019", title: "Started Training", description: "Began the fitness journey with a passion for bodybuilding." },
  { year: "2020", title: "First Competition", description: "Competed in regional men's physique, placing top 5." },
  { year: "2021", title: "Certified Trainer", description: "Obtained professional certifications and started coaching." },
  { year: "2022", title: "100+ Clients", description: "Coached over 100 clients with remarkable transformations." },
  { year: "2023", title: "Online Expansion", description: "Launched online coaching to help clients globally." },
  { year: "2024", title: "Ruden Fitness Brand", description: "Established Ruden Fitness as a premium brand." },
];

const philosophy = [
  { title: "Discipline Over Motivation", description: "We build habits that last a lifetime, not just for a photoshoot." },
  { title: "Science-Based Training", description: "Every program is backed by exercise science — progressive overload, periodization, and recovery." },
  { title: "Holistic Transformation", description: "True transformation isn't just physical. We work on mindset, nutrition, sleep, and lifestyle." },
  { title: "Accountability & Support", description: "Constant check-ins, feedback, and adjustments ensure you stay on track." },
];

export default function AboutPage() {
  return (
    <div className="pt-24">
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070')" }} />
        <div className="absolute inset-0 bg-primary/85" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.h1 className="font-heading text-5xl sm:text-7xl tracking-wider" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            About <span className="text-gradient">Rudrendra</span>
          </motion.h1>
          <motion.p className="mt-4 text-muted font-body text-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            The journey of building an elite physique and coaching brand
          </motion.p>
        </div>
      </section>

      <section className="section-padding bg-primary">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <div className="aspect-[3/4] rounded-lg overflow-hidden gold-border">
                <div className="w-full h-full bg-cover bg-center hover:scale-105 transition-transform duration-700" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=2070')" }} />
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <span className="text-accent text-sm uppercase tracking-[0.3em] font-body">My Story</span>
              <h2 className="font-heading text-4xl sm:text-5xl tracking-wider mt-2 mb-6">
                From Passion to <span className="text-gradient">Profession</span>
              </h2>
              <div className="space-y-4 text-gray-300 font-body leading-relaxed">
                <p>My fitness journey began not in a gym, but with a decision — a decision to take control of my body, my health, and my life.</p>
                <p>As a competitive Men&apos;s Physique athlete, I&apos;ve spent years understanding the science and art of body transformation.</p>
                <p>Today, through Ruden Fitness, I bring that same competition-level dedication to every client I work with.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary">
        <div className="max-w-4xl mx-auto">
          <SectionHeading title="The Journey" subtitle="Key milestones in the Ruden Fitness story" />
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-accent/20" />
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <ScrollReveal key={milestone.year} direction={index % 2 === 0 ? "left" : "right"} delay={index * 0.1}>
                  <div className={`flex items-center gap-8 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                    <div className={`flex-1 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
                      <span className="font-heading text-2xl text-accent tracking-wider">{milestone.year}</span>
                      <h3 className="font-heading text-xl tracking-wider text-white mt-1">{milestone.title}</h3>
                      <p className="text-muted text-sm font-body mt-2">{milestone.description}</p>
                    </div>
                    <div className="relative flex-shrink-0">
                      <div className="w-4 h-4 rounded-full bg-accent" />
                    </div>
                    <div className="flex-1" />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-primary">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="Coaching Philosophy" subtitle="The principles that drive every transformation" />
          <div className="grid sm:grid-cols-2 gap-6">
            {philosophy.map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 0.1}>
                <div className="glass rounded-lg p-8 h-full hover:gold-glow transition-all duration-500">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                    <span className="font-heading text-xl text-accent">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="font-heading text-xl tracking-wider text-white mb-3">{item.title}</h3>
                  <p className="text-muted font-body text-sm leading-relaxed">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary text-center">
        <ScrollReveal>
          <h2 className="font-heading text-4xl sm:text-5xl tracking-wider">
            Ready to Start <span className="text-gradient">Your Journey</span>?
          </h2>
          <p className="mt-4 text-muted font-body text-lg max-w-xl mx-auto">
            Let&apos;s build something extraordinary together.
          </p>
          <div className="mt-8">
            <Button variant="primary" size="lg" href="/contact">Book Your Consultation</Button>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}