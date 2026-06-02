import { ReactNode } from "react";

type BrandCardProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Card matching the iOS BrandCard: warmWhite surface, linen border,
 * bark-tinted shadow, lg radius.
 */
export default function BrandCard({ children, className = "" }: BrandCardProps) {
  return (
    <div
      className={`rounded-lg border border-linen bg-warmWhite shadow-card ${className}`}
    >
      {children}
    </div>
  );
}
