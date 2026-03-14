import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  slug: string;
  name: string;
  price: string;
  description: string;
  imageSrc?: string;
}

export default function ProductCard({ slug, name, price, description, imageSrc }: ProductCardProps) {
  return (
    <Link href={`/webshop/${slug}`} className="group block bg-white rounded-2xl shadow hover:shadow-lg transition-shadow overflow-hidden border border-[#E9C46A]/20">
      <div className="relative h-48 bg-[#264653]/10">
        {imageSrc ? (
          <Image src={imageSrc} alt={name} fill className="object-cover" />
        ) : (
          <div className="flex items-center justify-center h-full text-5xl">☀️</div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-[#264653] group-hover:text-[#E76F51] transition-colors" style={{ fontFamily: "'Nunito', sans-serif" }}>
          {name}
        </h3>
        <p className="text-sm text-[#264653]/70 mt-1 line-clamp-2" style={{ fontFamily: "'Lato', sans-serif" }}>
          {description}
        </p>
        <p className="mt-3 text-[#E76F51] font-extrabold text-xl" style={{ fontFamily: "'Nunito', sans-serif" }}>
          {price}
        </p>
      </div>
    </Link>
  );
}
