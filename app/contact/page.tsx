"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiInstagram,
  FiMessageCircle,
  FiSend,
  FiCheckCircle,
} from "react-icons/fi";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";
import { submitApplication } from "@/lib/firestore";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    program: "",
    goals: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await submitApplication({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        program: formData.program,
        goals: formData.goals,
        message: formData.message,
      });
      console.log("✅ Application submitted to Firestore!");
      setIsSubmitted(true);
    } catch (err) {
      console.error("❌ Failed to submit application:", err);
      setError("Failed to submit. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070')",
          }}
        />
        <div className="absolute inset-0 bg-primary/85" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.h1
            className="font-heading text-5xl sm:text-7xl tracking-wider"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Get In <span className="text-gradient">Touch</span>
          </motion.h1>
          <motion.p
            className="mt-4 text-muted font-body text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Ready to start your transformation? Let&apos;s talk.
          </motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-primary">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Left Side — Contact Info */}
            <div className="lg:col-span-2">
              <ScrollReveal direction="left">
                <h2 className="font-heading text-3xl tracking-wider mb-6">
                  Let&apos;s <span className="text-gradient">Connect</span>
                </h2>
                <p className="text-gray-400 font-body text-sm leading-relaxed mb-10">
                  Reach out — I respond to every message personally.
                </p>
                <div className="space-y-6">
                  {[
                    {
                      icon: FiMail,
                      label: "Email",
                      value: "contact@rudenfitness.com",
                    },
                    {
                      icon: FiPhone,
                      label: "Phone / WhatsApp",
                      value: "+91 99999 99999",
                    },
                    {
                      icon: FiInstagram,
                      label: "Instagram",
                      value: "@ruden_s",
                    },
                    {
                      icon: FiMapPin,
                      label: "Location",
                      value: "Available for in-person & online coaching",
                    },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="text-accent" size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-muted uppercase tracking-wider font-body">
                          {item.label}
                        </p>
                        <p className="text-white font-body text-sm">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-10">
                  <a
                    href="https://wa.me/9779749939797?text=Hi%20Rudrendra%2C%20I%27m%20interested%20in%20personal%20training"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 glass rounded-lg p-4 hover:border-green-500/50 transition-all"
                  >
                    <FiMessageCircle className="text-green-500" size={24} />
                    <div>
                      <p className="text-white text-sm font-body font-semibold">
                        Chat on WhatsApp
                      </p>
                      <p className="text-muted text-xs font-body">
                        Quick response guaranteed
                      </p>
                    </div>
                  </a>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Side — Application Form */}
            <div className="lg:col-span-3">
              <ScrollReveal direction="right">
                <div className="glass rounded-lg p-8 lg:p-10">
                  {isSubmitted ? (
                    <motion.div
                      className="text-center py-12"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                        <FiCheckCircle className="text-green-500" size={40} />
                      </div>
                      <h3 className="font-heading text-3xl tracking-wider text-accent">
                        Application Sent!
                      </h3>
                      <p className="text-muted font-body mt-3 max-w-md mx-auto">
                        Your application has been received. Rudrendra will
                        review it and get back to you within 24 hours.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({
                            name: "",
                            email: "",
                            phone: "",
                            program: "",
                            goals: "",
                            message: "",
                          });
                        }}
                        className="mt-6 text-accent text-sm font-body underline hover:text-accent-light transition-colors"
                      >
                        Send another application
                      </button>
                    </motion.div>
                  ) : (
                    <>
                      <h3 className="font-heading text-2xl tracking-wider text-white mb-1">
                        Application Form
                      </h3>
                      <p className="text-muted font-body text-sm mb-8">
                        Fill out the form and we&apos;ll be in touch
                      </p>

                      {error && (
                        <div className="mb-6 p-3 rounded-sm bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-body text-center">
                          {error}
                        </div>
                      )}

                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-xs text-muted uppercase tracking-wider font-body mb-2">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              className="w-full bg-surface border border-white/10 rounded-sm px-4 py-3 text-white font-body text-sm focus:border-accent focus:outline-none transition-colors placeholder-muted/50"
                              placeholder="Your name"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-muted uppercase tracking-wider font-body mb-2">
                              Email *
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className="w-full bg-surface border border-white/10 rounded-sm px-4 py-3 text-white font-body text-sm focus:border-accent focus:outline-none transition-colors placeholder-muted/50"
                              placeholder="your@email.com"
                            />
                          </div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-xs text-muted uppercase tracking-wider font-body mb-2">
                              Phone
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className="w-full bg-surface border border-white/10 rounded-sm px-4 py-3 text-white font-body text-sm focus:border-accent focus:outline-none transition-colors placeholder-muted/50"
                              placeholder="+91 XXXXX XXXXX"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-muted uppercase tracking-wider font-body mb-2">
                              Program Interest *
                            </label>
                            <select
                              name="program"
                              value={formData.program}
                              onChange={handleChange}
                              required
                              className="w-full bg-surface border border-white/10 rounded-sm px-4 py-3 text-white font-body text-sm focus:border-accent focus:outline-none transition-colors"
                            >
                              <option value="">Select a program</option>
                              <option value="Online Coaching">
                                Online Coaching
                              </option>
                              <option value="Personal Training">
                                Personal Training
                              </option>
                              <option value="90-Day Transformation">
                                90-Day Transformation
                              </option>
                              <option value="Not sure yet">
                                Not sure yet
                              </option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs text-muted uppercase tracking-wider font-body mb-2">
                            Your Fitness Goals *
                          </label>
                          <input
                            type="text"
                            name="goals"
                            value={formData.goals}
                            onChange={handleChange}
                            required
                            className="w-full bg-surface border border-white/10 rounded-sm px-4 py-3 text-white font-body text-sm focus:border-accent focus:outline-none transition-colors placeholder-muted/50"
                            placeholder="e.g., Lose 10kg, build muscle"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-muted uppercase tracking-wider font-body mb-2">
                            Additional Message
                          </label>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={4}
                            className="w-full bg-surface border border-white/10 rounded-sm px-4 py-3 text-white font-body text-sm focus:border-accent focus:outline-none transition-colors placeholder-muted/50 resize-none"
                            placeholder="Tell us anything else..."
                          />
                        </div>
                        <Button
                          variant="primary"
                          size="lg"
                          type="submit"
                          className="w-full justify-center"
                        >
                          {isSubmitting
                            ? "Submitting..."
                            : "Submit Application"}
                        </Button>
                      </form>
                    </>
                  )}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}