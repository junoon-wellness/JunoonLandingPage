"use client";

import { AnchorHTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";

// Framer Motion redefines the drag/animation event handlers, which clash with
// the native anchor handler signatures — omit them from the passthrough props.
type ConflictingHandlers =
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
  | "onDragEnter"
  | "onDragExit"
  | "onDragLeave"
  | "onDragOver"
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration";

type OutlineButtonProps = {
  children: ReactNode;
  href: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, ConflictingHandlers>;

/**
 * Outline variant of the clay button — used for secondary / nav actions.
 */
export default function OutlineButton({
  children,
  href,
  className = "",
  ...rest
}: OutlineButtonProps) {
  return (
    <motion.a
      href={href}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`inline-flex items-center justify-center gap-2 rounded-md border border-clay bg-transparent px-6 py-3 font-sans text-sm font-medium text-clay transition-colors duration-200 hover:bg-clay hover:text-ivory ${className}`}
      {...rest}
    >
      {children}
    </motion.a>
  );
}
