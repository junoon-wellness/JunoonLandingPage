import { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 28,
  height: 28,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

// Habits — a leaf
function LeafIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8a7 7 0 0 1-7 7Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6" />
    </svg>
  );
}

// Movement — a moving figure
function FigureIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="4" r="1.6" />
      <path d="M9 9l3-1 3 1" />
      <path d="M12 8v6" />
      <path d="M12 14l-3 6" />
      <path d="M12 14l3 6" />
      <path d="M6 11l3-2" />
      <path d="M18 11l-3-2" />
    </svg>
  );
}

// Mental Health — a calm mind
function MindIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9.5 21a4.5 4.5 0 0 1-4-6.5 4.5 4.5 0 0 1 .9-5.4A4.5 4.5 0 0 1 12 5a4.5 4.5 0 0 1 5.6 4.1 4.5 4.5 0 0 1 .9 5.4 4.5 4.5 0 0 1-4 6.5Z" />
      <path d="M12 5v16" />
    </svg>
  );
}

export const icons = {
  leaf: LeafIcon,
  figure: FigureIcon,
  mind: MindIcon,
} as const;

export type IconName = keyof typeof icons;

export function Icon({ name, ...props }: { name: string } & IconProps) {
  const Cmp = icons[name as IconName] ?? LeafIcon;
  return <Cmp {...props} />;
}
