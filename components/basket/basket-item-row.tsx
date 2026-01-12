"use client";

import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";

export interface BasketRowItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface BasketItemRowProps {
  item: BasketRowItem;
  onRemove: (id: string) => void;
  onClose?: () => void;
}

export default function BasketItemRow({
  item,
  onRemove,
  onClose,
}: BasketItemRowProps) {
  return (
    <div className="flex gap-4 py-4 border-b">
      <button
        onClick={() => onRemove(item.id)}
        className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-pink-600 text-pink-600 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-colors"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="relative w-20 h-20 flex-shrink-0">
        <Image src={item.image} alt={item.name} fill className="object-cover rounded" />
      </div>

      <div className="flex-1 min-w-0">
        <Link
          href="/shop-details"
          onClick={onClose}
          className="font-medium text-gray-900 hover:text-pink-600 block mb-1 line-clamp-2"
        >
          {item.name}
        </Link>

        <p className="text-sm text-gray-600">
          <span className="font-medium">{item.quantity}</span> ×
          <span className="text-pink-600 font-bold ml-1">
            ${item.price.toFixed(2)}
          </span>
        </p>
      </div>
    </div>
  );
}
