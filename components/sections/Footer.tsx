"use client";

import Link from "next/link";
import { FiInstagram, FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const footerLinks = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Programs", href: "/programs" },
      { label: "Transformations", href: "/transformations" },
    ],
  },
  {
    title: "Programs",
    links: [
      { label: "Online Coaching", href: "/programs" },
      { label: "Personal Training", href: "/programs" },
      { label: "90-Day Transformation", href: "/programs" },
      { label: "Client Dashboard", href: "/dashboard/login" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-secondary border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <Link href="/" className="inline-block">
              <span className="font-heading text-3xl tracking-widest text-gradient">
                RUDEN
              </span>
              <span className="font-heading text-3xl tracking-widest text-white ml-1">
                FITNESS
              </span>
            </Link>
            <p className="text-muted font-body text-sm mt-4 leading-relaxed">
              Elite personal training by Rudrendra Shrestha. Building bodies,
              discipline, and champions.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://instagram.com/ruden_s"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-accent/30 flex items-center justify-center text-accent hover:bg-accent hover:text-primary transition-all duration-300"
              >
                <FiInstagram size={18} />
              </a>
              <a
                href="mailto:contact@rudenfitness.com"
                className="w-10 h-10 rounded-full border border-accent/30 flex items-center justify-center text-accent hover:bg-accent hover:text-primary transition-all duration-300"
              >
                <FiMail size={18} />
              </a>
            </div>
          </div>
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="font-heading text-lg tracking-wider text-white mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted font-body text-sm hover:text-accent transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h4 className="font-heading text-lg tracking-wider text-white mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-muted font-body text-sm">
                <FiMail className="text-accent flex-shrink-0" size={14} />
                contact@rudenfitness.com
              </li>
              <li className="flex items-center gap-3 text-muted font-body text-sm">
                <FiPhone className="text-accent flex-shrink-0" size={14} />
                +91 99999 99999
              </li>
              <li className="flex items-start gap-3 text-muted font-body text-sm">
                <FiMapPin className="text-accent flex-shrink-0 mt-0.5" size={14} />
                Available for in-person and online training
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted font-body text-xs">
            © {new Date().getFullYear()} Ruden Fitness. All rights reserved.
          </p>
          <p className="text-muted/50 font-body text-xs">
            Designed for champions.
          </p>
        </div>
      </div>
    </footer>
  );
}