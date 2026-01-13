"use client";

import { useMemo, useState } from "react";
import { Layout } from "lucide-react";

import ProductCard from "@/components/product/product-card";
import { products } from "@/data/catalog";
import type { Product } from "@/types";

type Extra = Product & { color?: string; brand?: string };

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState("all");
  const [showFilter, setShowFilter] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState(100);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    let result = [...products] as Extra[];

    // Tabs
    if (activeTab === "popular") result = result.filter((p) => p.isNew);
    if (activeTab === "sale") result = result.filter((p) => p.isSale);
    if (activeTab === "rated") result = result.filter((p) => (p.rating ?? 0) >= 4);

    // Sidebar filters
    if (showFilter) {
      if (selectedCategory) result = result.filter((p) => p.category === selectedCategory);
      if (selectedColor) result = result.filter((p) => p.color === selectedColor);
      if (selectedBrand) result = result.filter((p) => p.brand === selectedBrand);
      result = result.filter((p) => p.price <= priceRange);
    }

    const limit = showFilter ? 8 : 10;
    return result.slice(0, limit);
  }, [activeTab, showFilter, selectedCategory, priceRange, selectedColor, selectedBrand]);

  const tabs = [
    { id: "all", label: "All" },
    { id: "popular", label: "Popular" },
    { id: "sale", label: "On Sale" },
    { id: "rated", label: "Best Rated" },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-[1600px]">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b pb-6">
          <h2 className="flex items-baseline">
            <span className="text-[#1A1C24] text-[32px] font-bold tracking-tight">
              Popular
            </span>
            <span className="text-[#C3293E] text-[32px] font-light ml-2">
              Products
            </span>
          </h2>

          <div className="flex items-center gap-8">
            <button
              type="button"
              onClick={() => setShowFilter(!showFilter)}
              className={`flex items-center gap-2 text-[13px] font-bold uppercase tracking-widest transition-colors ${
                showFilter ? "text-[#C3293E]" : "text-black hover:text-[#C3293E]"
              }`}
            >
              Filter <Layout className="w-5 h-5" />
            </button>

            <div className="flex gap-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-[13px] font-bold uppercase tracking-widest pb-1 border-b-2 transition-all ${
                    activeTab === tab.id
                      ? "border-[#C3293E] text-black"
                      : "border-transparent text-gray-400 hover:text-black"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex gap-10">
          {/* Grid */}
          <div className={`transition-all duration-500 ease-in-out ${showFilter ? "w-[78%]" : "w-full"}`}>
            <div
              className={`grid gap-x-6 gap-y-12 transition-all duration-500 ${
                showFilter
                  ? "grid-cols-4"
                  : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5"
              }`}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product as Product} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          {showFilter && (
            <aside className="w-[22%] animate-in fade-in slide-in-from-right-10 duration-500">
              <div className="sticky top-24 border-l pl-8 space-y-12">
                <FacetGroup
                  title="Category"
                  items={["Kids", "Mens", "Womens"]}
                  selected={selectedCategory}
                  onSelect={setSelectedCategory}
                />

                <div>
                  <h3 className="text-[15px] font-bold text-black mb-6 border-b pb-2 italic">
                    Filter
                  </h3>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    step="5"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full h-[3px] bg-gray-100 appearance-none cursor-pointer accent-[#C3293E]"
                  />
                  <p className="mt-4 text-xl font-bold text-[#C3293E]">{priceRange}$</p>
                </div>

                <FacetGroup
                  title="Color"
                  items={["Black", "Blue", "Gray", "Green", "Red"]}
                  selected={selectedColor}
                  onSelect={setSelectedColor}
                />

                <FacetGroup
                  title="Brand"
                  items={["Adidas", "Balenciaga", "Balmain", "Burberry", "Chloe"]}
                  selected={selectedBrand}
                  onSelect={setSelectedBrand}
                />
              </div>
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}

function FacetGroup({
  title,
  items,
  selected,
  onSelect,
}: {
  title: string;
  items: string[];
  selected: string | null;
  onSelect: (v: string | null) => void;
}) {
  return (
    <div>
      <h3 className="text-[15px] font-bold text-black mb-6 border-b pb-2 italic">{title}</h3>
      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-center gap-3 group cursor-pointer"
            onClick={() => onSelect(selected === item ? null : item)}
          >
            <div
              className={`w-4 h-4 transition-colors rounded-[2px] ${
                selected === item ? "bg-[#C3293E]" : "bg-[#EDEDED]"
              }`}
            />
            <span
              className={`text-[14px] transition-colors ${
                selected === item ? "text-black font-bold" : "text-gray-500 group-hover:text-black"
              }`}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
