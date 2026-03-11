"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className,
  type = "button",
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-body font-semibold tracking-wide uppercase transition-all duration-300 rounded-sm";

  const variants = {
    primary:
      "bg-gold-gradient text-primary hover:shadow-[0_0_30px_rgba(200,169,90,0.4)] hover:scale-105",
    secondary:
      "bg-surface text-white border border-accent/30 hover:border-accent hover:shadow-[0_0_20px_rgba(200,169,90,0.2)]",
    outline:
      "bg-transparent text-accent border-2 border-accent hover:bg-accent hover:text-primary",
  };

  const sizes = {
    sm: "px-5 py-2.5 text-xs",
    md: "px-8 py-3.5 text-sm",
    lg: "px-10 py-4 text-base",
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      href={href || undefined}
      onClick={onClick}
      type={!href ? type : undefined}
      className={clsx(baseClasses, variants[variant], sizes[size], className)}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </Component>
  );
}