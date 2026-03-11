"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FiMenu, FiX, FiInstagram, FiUser } from "react-icons/fi";
import { useAuth } from "@/hooks/useAuth";

const ADMIN_EMAIL = "abhi.kush047@gmail.com";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Transformations", href: "/transformations" },
  { label: "Programs", href: "/programs" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine dashboard link and label based on auth state
  const getDashboardLink = () => {
    if (!user) {
      return { href: "/dashboard/login", label: "Client Login" };
    }
    if (user.email === ADMIN_EMAIL) {
      return { href: "/admin", label: "Admin Panel" };
    }
    return { href: "/dashboard", label: user.displayName || user.email?.split("@")[0] || "Dashboard" };
  };

  const dashboardInfo = getDashboardLink();

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "glass py-3 shadow-lg shadow-black/20"
            : "bg-transparent py-5"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-heading text-3xl tracking-widest text-gradient">
              RUDEN
            </span>
            <span className="font-heading text-3xl tracking-widest text-white">
              FITNESS
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-sm uppercase tracking-wider text-muted hover:text-accent transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="https://instagram.com/ruden_s"
              target="_blank"
              className="text-muted hover:text-accent transition-colors"
            >
              <FiInstagram size={20} />
            </Link>

            {/* Dynamic Login/Dashboard Button */}
            <Link
              href={dashboardInfo.href}
              className={`flex items-center gap-2 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all duration-300 ${
                user
                  ? "bg-accent/20 border border-accent/50 text-accent hover:bg-accent hover:text-primary"
                  : "border border-accent/50 text-accent hover:bg-accent hover:text-primary"
              }`}
            >
              {user && <FiUser size={14} />}
              {dashboardInfo.label}
            </Link>
          </div>

          <button
            className="lg:hidden text-white z-50"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-primary/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="font-heading text-4xl tracking-widest text-white hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Link
                href={dashboardInfo.href}
                onClick={() => setIsMobileOpen(false)}
                className="mt-4 flex items-center gap-2 px-8 py-3 border border-accent text-accent font-body text-sm uppercase tracking-wider hover:bg-accent hover:text-primary transition-all rounded-sm"
              >
                {user && <FiUser size={14} />}
                {dashboardInfo.label}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}