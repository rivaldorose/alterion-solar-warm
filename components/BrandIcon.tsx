import Image from "next/image";

interface BrandIconProps {
  size?: number;
  className?: string;
}

// Small Alterion sun/bolt mark used to prefix primary CTA buttons.
// Uses the existing favicon-sun.png so there's no extra asset load.
export default function BrandIcon({ size = 20, className = "" }: BrandIconProps) {
  return (
    <Image
      src="/favicon-sun.png"
      alt=""
      width={size}
      height={size}
      className={`inline-block shrink-0 ${className}`}
      aria-hidden="true"
    />
  );
}
