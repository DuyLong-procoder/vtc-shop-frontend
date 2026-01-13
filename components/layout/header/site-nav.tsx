"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Menu,
  ChevronDown,
  Phone,
  MapPin,
  Flame,
  Gift,
  Droplet,
  Crown,
  Gem,
} from "lucide-react";

type DropdownLink = { label: string; href: string };
type MenuItem =
  | { label: string; href: string } // ✅ link item (KHÔNG có dropdown)
  | { label: string; dropdown: DropdownLink[] }; // ✅ dropdown item (KHÔNG có href)

export default function HeaderNavigation() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const categories = [
    { name: "Candles", icon: Flame },
    { name: "Handmade", icon: Gift },
    { name: "Gift Sets", icon: Gift },
    { name: "Plastic Gifts", icon: Gem },
    { name: "Handy Cream", icon: Droplet },
    { name: "Cosmetics", icon: Crown },
    { name: "Silk Accessories", icon: Gem },
  ];

  const menuItems: MenuItem[] = [
    {
      label: "Home",
      dropdown: [
        { label: "Wooden Home", href: "/filter?category=Wooden" },
        { label: "Fashion Home", href: "/index-2" },
      ],
    },
    {
      label: "Shop",
      dropdown: [
        { label: "Shop", href: "/shop" },
        { label: "Cart", href: "/cart" },
      ],
    },
    {
      label: "Pages",
      dropdown: [
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      label: "Blog",
      dropdown: [
        { label: "Blog", href: "/blog" },
        { label: "Blog Details", href: "/blog-details" },
      ],
    },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="bg-white border-b relative z-50 overflow-visible">
      <div className="container mx-auto px-4 flex items-center h-16 min-w-0 overflow-visible">
        {/* Categories button */}
        <div className="relative group shrink-0 overflow-visible">
          <button
            type="button"
            className="bg-[#C3293E] text-white flex items-center gap-3 px-6 h-12 rounded-t-lg font-semibold min-w-[260px] tracking-wide"
          >
            <Menu className="w-5 h-5" />
            <span className="uppercase text-[13px]">Categories</span>
            <ChevronDown
              className={`w-4 h-4 ml-auto transition-transform ${
                !isHomePage ? "group-hover:rotate-180" : ""
              }`}
            />
          </button>

          {/* CATEGORY LIST */}
          <div
            className={`absolute top-full left-0 w-[260px] bg-white border shadow-xl py-2 z-[999]
              ${
                isHomePage
                  ? "block"
                  : "hidden group-hover:block animate-in fade-in slide-in-from-top-2 duration-200"
              }`}
          >
            {categories.map((cat, idx) => (
              <Link
                key={idx}
                href={`/shop?category=${cat.name.toLowerCase()}`}
                className="flex items-center gap-3 px-6 py-3 hover:bg-gray-50 hover:text-[#C3293E] transition-colors"
              >
                <cat.icon className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium">{cat.name}</span>
              </Link>
            ))}

            <div className="border-t mt-1">
              <Link
                href="/shop"
                className="block px-6 py-3 text-sm hover:bg-gray-50 hover:text-[#C3293E]"
              >
                Value of the Day
              </Link>
              <Link
                href="/shop"
                className="block px-6 py-3 text-sm hover:bg-gray-50 hover:text-[#C3293E]"
              >
                Top 100 Offers
              </Link>
              <Link
                href="/shop"
                className="block px-6 py-3 text-sm hover:bg-gray-50 hover:text-[#C3293E]"
              >
                New Arrivals
              </Link>
            </div>
          </div>
        </div>

        {/* MAIN NAVIGATION */}
        <ul className="hidden lg:flex items-center gap-8 ml-10 flex-1 min-w-0 whitespace-nowrap">
          {menuItems.map((item) => (
            <li key={item.label} className="relative group h-16 flex items-center">
              {"dropdown" in item ? (
                <>
                  <button
                    type="button"
                    className="flex items-center gap-1 text-gray-800 hover:text-[#C3293E] transition-colors font-semibold uppercase tracking-wide text-[13px]"
                  >
                    {item.label}
                    <ChevronDown className="w-3 h-3 text-gray-400 group-hover:rotate-180 transition-transform" />
                  </button>

                  <div className="absolute top-full left-0 hidden group-hover:block w-52 bg-white border shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-1">
                    {item.dropdown.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#C3293E]"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  href={item.href}
                  className="text-gray-800 hover:text-[#C3293E] transition-colors font-semibold uppercase tracking-wide text-[13px]"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-8 ml-auto shrink-0">
          <a
            href="tel:1900292958"
            className="hidden lg:flex items-center gap-2 font-semibold uppercase tracking-wide text-[13px] text-gray-800 hover:text-[#C3293E]"
          >
            <Phone className="w-4 h-4 text-[#C3293E]" />
            <span className="normal-case font-bold tracking-normal text-[15px]">
              1900 292958
            </span>
          </a>

          <Link
            href="/shop-location"
            className="hidden sm:flex items-center gap-2 font-semibold uppercase tracking-wide text-[13px] text-gray-800 hover:text-[#C3293E]"
          >
            <MapPin className="w-4 h-4 text-[#C3293E]" />
            <span className="normal-case font-bold tracking-normal text-[15px]">
              Find Store
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
