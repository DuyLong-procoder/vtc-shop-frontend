"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Product } from "@/types";
import toast from "react-hot-toast";

export interface BasketItem extends Product {
  quantity: number;
}

interface BasketContextType {
  basket: BasketItem[];
  addToBasket: (product: Product) => void;
  removeFromBasket: (productId: number) => void;
  updateBasketQty: (productId: number, quantity: number) => void;
  clearBasket: () => void;
  getBasketCount: () => number;
  getBasketTotal: () => number;
}

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export function BasketProvider({ children }: { children: ReactNode }) {
  const [basket, setBasket] = useState<BasketItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setBasket(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(basket));
  }, [basket]);

  const addToBasket = (product: Product) => {
    setBasket((prev) => {
      const existed = prev.find((x) => x.id === product.id);
      if (existed) {
        toast.success("Quantity updated!");
        return prev.map((x) => (x.id === product.id ? { ...x, quantity: x.quantity + 1 } : x));
      }
      toast.success("Added to cart!");
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromBasket = (productId: number) => {
    setBasket((prev) => prev.filter((x) => x.id !== productId));
    toast.success("Removed from cart!");
  };

  const updateBasketQty = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromBasket(productId);
      return;
    }
    setBasket((prev) => prev.map((x) => (x.id === productId ? { ...x, quantity } : x)));
  };

  const clearBasket = () => {
    setBasket([]);
    toast.success("Cart cleared!");
  };

  const getBasketCount = () => basket.reduce((t, x) => t + x.quantity, 0);
  const getBasketTotal = () => basket.reduce((t, x) => t + x.price * x.quantity, 0);

  return (
    <BasketContext.Provider
      value={{
        basket,
        addToBasket,
        removeFromBasket,
        updateBasketQty,
        clearBasket,
        getBasketCount,
        getBasketTotal,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
}

export function useBasket() {
  const ctx = useContext(BasketContext);
  if (!ctx) throw new Error("useBasket must be used within BasketProvider");
  return ctx;
}


export const CartProvider = BasketProvider;
export const useCart = () => {
  const b = useBasket();
  return {
    cart: b.basket,
    addToCart: b.addToBasket,
    removeFromCart: b.removeFromBasket,
    updateQuantity: b.updateBasketQty,
    clearCart: b.clearBasket,
    getTotalItems: b.getBasketCount,
    getTotalPrice: b.getBasketTotal,
  };
};
