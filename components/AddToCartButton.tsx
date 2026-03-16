"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";

interface Props {
  slug: string;
  name: string;
  price: number;
  image: string;
  label?: string;
}

export default function AddToCartButton({ slug, name, price, image, label = "In winkelwagen" }: Props) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({ slug, name, price, image });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button
      onClick={handleAdd}
      className={`w-full font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
        added
          ? "bg-emerald-500 text-white"
          : "bg-primary hover:bg-primary/90 text-secondary"
      }`}
    >
      <span className="material-symbols-outlined text-[20px]">
        {added ? "check" : "shopping_cart"}
      </span>
      {added ? "Toegevoegd!" : label}
    </button>
  );
}
