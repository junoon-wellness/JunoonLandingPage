"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";

// Framer Motion redefines the drag/animation event handlers, which clash with
// the native button handler signatures — omit them from the passthrough props.
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

type PrimaryButtonProps = {
  children: ReactNode;
  fullWidth?: boolean;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, ConflictingHandlers>;

/**
 * Clay-filled button matching the iOS PrimaryButtonStyle:
 * clay background, ivory text, clay shadow, subtle scale on press.
 */
export default function PrimaryButton({
  children,
  fullWidth = false,
  className = "",
  disabled,
  ...rest
}: PrimaryButtonProps) {
  return (
    <motion.button
      whileTap={disabled ? undefined : { scale: 0.97 }}
      transition={{ duration: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-md bg-clay px-6 py-3.5 font-sans text-sm font-medium text-ivory shadow-button transition-colors duration-200 hover:bg-clay700 disabled:cursor-not-allowed disabled:opacity-60 ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
