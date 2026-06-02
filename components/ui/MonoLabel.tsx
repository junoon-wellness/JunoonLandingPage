import { ReactNode } from "react";

type MonoLabelProps = {
  children: ReactNode;
  /** Use the slightly larger 0.75rem variant */
  large?: boolean;
  className?: string;
};

/**
 * Uppercase DM Mono label with brand letter-spacing.
 * Defaults to clay colour; override with a text-* class via className.
 */
export default function MonoLabel({ children, large = false, className = "" }: MonoLabelProps) {
  return (
    <span
      className={`mono-label font-mono uppercase text-clay ${
        large ? "text-[0.75rem]" : "text-[0.625rem]"
      } leading-none ${className}`}
    >
      {children}
    </span>
  );
}
