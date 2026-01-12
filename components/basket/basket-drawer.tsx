"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { X, ShoppingBag } from "lucide-react";
import { useBasket } from "@/lib/basket/basket-store";
import BasketItemRow from "@/components/basket/basket-item-row";

export default function BasketDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { basket, removeFromBasket, getBasketTotal } = useBasket();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <>
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ease-in-out z-[9998] ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={`fixed top-0 right-0 w-full max-w-[400px] h-screen bg-white shadow-2xl z-[9999] transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 border-b flex items-center justify-between bg-white shrink-0">
          <h2 className="text-lg font-bold uppercase tracking-tight text-black">
            Your Cart
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-all group"
          >
            <X className="w-5 h-5 text-gray-500 group-hover:text-black group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-200">
          {basket.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <ShoppingBag className="w-16 h-16 mb-4 opacity-10" />
              <p className="text-sm font-medium text-center">
                Giỏ hàng của bạn đang trống
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {basket.map((item) => (
                <BasketItemRow
                  key={item.id}
                  item={{ ...item, id: String(item.id) }}
                  onRemove={(id) => removeFromBasket(Number(id))}
                  onClose={onClose}
                />
              ))}
            </div>
          )}
        </div>

        {basket.length > 0 && (
          <div className="p-6 border-t bg-white shrink-0 space-y-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-gray-500 text-sm uppercase tracking-wide">
                Subtotal:
              </span>
              <span className="text-xl font-black text-[#C3293E]">
                ${getBasketTotal().toFixed(2)}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                href="/cart"
                onClick={onClose}
                className="block w-full py-3.5 text-center border-2 border-gray-200 rounded-full font-bold text-[11px] uppercase tracking-widest text-black hover:border-[#C3293E] hover:text-[#C3293E] transition-all"
              >
                View Cart
              </Link>

              <Link
                href="/checkout"
                onClick={onClose}
                className="block w-full py-3.5 text-center bg-[#C3293E] text-white rounded-full font-bold text-[11px] uppercase tracking-widest hover:bg-red-800 transition-all shadow-lg shadow-red-100"
              >
                Checkout Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </>,
    document.body
  );
}
