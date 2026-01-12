"use client";

import Link from "next/link";
import Image from "next/image";
import { categories } from "@/data/categories";

export default function BrowseCategories() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="flex items-baseline mb-12">
          <span className="text-[#1A1C24] text-[32px] font-bold tracking-tight">
            Top
          </span>
          <span className="text-[#C3293E] text-[32px] font-light ml-2">
            Categories
          </span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 divide-x divide-gray-200">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/shop?category=${category.slug}`}
              className="group"
            >
              <div className="rounded-lg p-6 text-center transition-shadow">
                <div className="relative w-16 h-16 mx-auto mb-4">
                  <Image
                    src={category.icon}
                    alt={category.name}
                    fill
                    className="object-contain group-hover:scale-110 transition-transform"
                  />
                </div>

                <span className="inline-block bg-red-500 text-white text-xs px-2 py-1 rounded mb-2">
                  {category.productCount}
                </span>

                <h3 className="font-medium text-sm group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
