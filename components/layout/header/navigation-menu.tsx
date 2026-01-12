// components/layout/navigation-menu.tsx

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Phone, MapPin, ChevronDown } from 'lucide-react';

export default function NavigationMenu() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const menuItems = [
    {
      label: 'Home',
      dropdown: [
        { label: 'Wooden Home', href: '/' },
        { label: 'Fashion Home', href: '/index-2' },
        { label: 'Furniture Home', href: '/index-3' },
        { label: 'Cosmetics Home', href: '/index-4' },
        { label: 'Food Grocery', href: '/index-5' },
      ],
    },
    {
      label: 'Shop',
      dropdown: [
        { label: 'Shop', href: '/shop' },
        { label: 'Shop 2', href: '/shop-2' },
        { label: 'Shop Details', href: '/shop-details' },
        { label: 'Cart', href: '/cart' },
      ],
    },
    {
      label: 'Pages',
      dropdown: [
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    {
      label: 'Blog',
      dropdown: [
        { label: 'Blog', href: '/blog' },
        { label: 'Blog Details', href: '/blog-details' },
      ],
    },
  ];

  return (
    <div className="flex items-center justify-between h-16">
      {/* Main Menu */}
      <ul className="flex items-center gap-8 font-semibold">
        {menuItems.map((item) => (
          <li
            key={item.label}
            className="relative h-16 flex items-center"
            onMouseEnter={() => setOpenDropdown(item.label)}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              className={`flex items-center gap-1 transition-colors ${
                openDropdown === item.label
                  ? 'text-pink-600'
                  : 'text-gray-700 hover:text-pink-600'
              }`}
            >
              {item.label}
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* Dropdown Menu */}
            {openDropdown === item.label && (
              <div className="absolute top-full left-0 w-56 bg-white border border-gray-100 rounded-lg shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                {item.dropdown.map((subItem) => (
                  <Link
                    key={subItem.label}
                    href={subItem.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-pink-600 transition-colors"
                  >
                    {subItem.label}
                  </Link>
                ))}
              </div>
            )}
          </li>
        ))}

        {/* Contact - No Dropdown */}
        <li className="h-16 flex items-center">
          <Link
            href="/contact"
            className="text-gray-700 hover:text-pink-600 font-semibold transition-colors"
          >
            Contact
          </Link>
        </li>
      </ul>

      {/* Right Links */}
      <div className="flex items-center gap-8 h-16 ">
        <a 
          href="tel:1900292958"
          className="flex items-center gap-2 text-pink-600 hover:text-pink-700 font-medium"
        >
          <Phone className="w-4 h-4" />
          <span>1900 292958</span>
        </a>

        <Link
          href="/shop-location"
          className="flex items-center gap-2 text-gray-700 hover:text-pink-600 font-medium"
        >
          <MapPin className="w-4 h-4" />
          <span>Find Store</span>
        </Link>
      </div>
    </div>
  );
}