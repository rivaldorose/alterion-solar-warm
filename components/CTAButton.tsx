import Link from "next/link";

interface CTAButtonProps {
  href?: string;
  label: string;
  variant?: "primary" | "outline";
  className?: string;
}

export default function CTAButton({ href = "/contact", label, variant = "primary", className = "" }: CTAButtonProps) {
  const base = "inline-block font-bold px-6 py-3 rounded-full transition-colors text-sm";
  const styles =
    variant === "outline"
      ? `${base} border-2 border-[#E76F51] text-[#E76F51] hover:bg-[#E76F51] hover:text-white`
      : `${base} bg-[#E76F51] text-white hover:bg-[#F4A261]`;

  return (
    <Link href={href} className={`${styles} ${className}`} style={{ fontFamily: "'Nunito', sans-serif" }}>
      {label}
    </Link>
  );
}
