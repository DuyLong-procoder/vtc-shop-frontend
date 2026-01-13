"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ShoppingCart, User, Heart, Search } from "lucide-react";
import { useBasket } from "@/lib/basket/basket-store";
import BasketDrawer from "@/components/basket/basket-drawer";

export default function CompactHeader() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { getBasketCount } = useBasket();

  const menuItems = [
    {
      label: "Home",
      dropdown: [
        { label: "Wooden Home", href: "/filter?category=Wooden" },
        { label: "Fashion Home", href: "/filter?preset=fashion" },
      ],
    },
    {
      label: "Shop",
      dropdown: [
        { label: "Shop List", href: "/shop" },
        { label: "Cart Page", href: "/cart" },
      ],
    },
    {
      label: "Pages",
      dropdown: [
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
      ],
    },
    { label: "Blog", dropdown: [{ label: "Blog Standard", href: "/blog" }] },
  ];

  return (
    <>
      <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/assets/img/logo/logo.png"
                alt="VTC Academy"
                width={180}
                height={60}
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden lg:block ml-10">
            <ul className="flex items-center gap-10">
              {menuItems.map((item) => (
                <li key={item.label} className="relative group flex items-center h-20">
                  {/* Trigger */}
                  <button
                    type="button"
                    className="flex items-center gap-1 text-[15px] font-bold text-black group-hover:text-[#C12744] transition-colors"
                  >
                    {item.label}
                    <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                  </button>

                  {/* Dropdown */}
                  <div className="absolute top-full left-0 mt-2 w-52 bg-white border border-gray-100 shadow-xl py-2 z-50 hidden group-hover:block">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#C12744] transition-colors"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </li>
              ))}

              <li>
                <Link
                  href="/contact"
                  className="text-[15px] font-bold text-black hover:text-[#C12744]"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          {/* Action Icons & Search */}
          <div className="flex items-center gap-5">
            {/* Cart Icon */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:text-[#C12744] transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {getBasketCount() > 0 && (
                <span className="absolute top-0 right-0 bg-[#C12744] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold border-2 border-white">
                  {getBasketCount()}
                </span>
              )}
            </button>

            {/* User Account */}
            <Link href="/auth" className="p-2 hover:text-[#C12744] transition-colors">
              <User className="w-6 h-6" />
            </Link>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative p-2 hover:text-[#C12744] transition-colors"
            >
              <Heart className="w-6 h-6" />
              <span className="absolute top-0 right-0 bg-[#C12744] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold border-2 border-white">
                0
              </span>
            </Link>

            {/* Search Bar */}
            <div className="relative hidden md:block ml-2">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-4 pr-10 py-2.5 bg-[#F8F9FA] border border-gray-200 rounded-lg w-60 text-sm focus:outline-none focus:ring-1 focus:ring-[#C12744]"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </header>

      <BasketDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
