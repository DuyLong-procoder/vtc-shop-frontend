"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "@/components/product/product-card";
import { products } from "@/data/products"; // ✅ đúng theo file bạn đang có
import type { Product } from "@/types";

type Extra = Product & { color?: string; brand?: string };

function uniq(arr: string[]) {
  return Array.from(new Set(arr));
}

export default function CatalogFilterView() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // lấy param từ URL
  const urlCategory = searchParams.get("category"); // ví dụ: Wooden
  const urlQ = searchParams.get("q") ?? "";

  // state filter
  const [selectedCategory, setSelectedCategory] = useState<string | null>(urlCategory);
  const [query, setQuery] = useState(urlQ);
  const [priceRange, setPriceRange] = useState<number>(200);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  // sync state khi user back/forward hoặc URL thay đổi
  useEffect(() => {
    setSelectedCategory(searchParams.get("category"));
    setQuery(searchParams.get("q") ?? "");
  }, [searchParams]);

  // list category/brand lấy từ data
  const categories = useMemo(() => {
    return uniq(products.map((p) => p.category)).sort();
  }, []);

  const brands = useMemo(() => {
    const list = (products as Extra[]).map((p) => p.brand).filter(Boolean) as string[];
    return uniq(list).sort();
  }, []);

  // update URL (để share link /filter?category=Wooden&q=abc)
  const updateUrl = (next: { category?: string | null; q?: string; brand?: string | null; price?: number }) => {
    const sp = new URLSearchParams(searchParams.toString());

    if ("category" in next) {
      if (next.category) sp.set("category", next.category);
      else sp.delete("category");
    }

    if ("q" in next) {
      const v = (next.q ?? "").trim();
      if (v) sp.set("q", v);
      else sp.delete("q");
    }

    router.replace(`/filter${sp.toString() ? `?${sp.toString()}` : ""}`);
  };

  // lọc sản phẩm
  const filteredProducts = useMemo(() => {
    let result = [...products] as Extra[];

    if (selectedCategory) {
      const c = selectedCategory.toLowerCase();
      result = result.filter((p) => (p.category ?? "").toLowerCase() === c);
    }

    const q = query.trim().toLowerCase();
    if (q) result = result.filter((p) => (p.name ?? "").toLowerCase().includes(q));

    if (selectedBrand) {
      const b = selectedBrand.toLowerCase();
      result = result.filter((p) => (p.brand ?? "").toLowerCase() === b);
    }

    result = result.filter((p) => (p.price ?? 0) <= priceRange);

    return result;
  }, [selectedCategory, query, selectedBrand, priceRange]);

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4 max-w-[1600px]">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 border-b pb-6 mb-8">
          <div>
            <h1 className="text-3xl font-black text-[#1A1C24]">Filter Products</h1>
            <p className="text-sm text-gray-500 mt-1">
              URL có thể lọc theo category:{" "}
              <code className="text-[#C3293E]">/filter?category=Wooden</code>
            </p>
          </div>

          {/* Search */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateUrl({ q: query });
            }}
            className="w-full lg:w-[480px]"
          >
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search product name..."
              className="w-full h-12 px-4 rounded-lg bg-gray-50 border border-transparent focus:border-gray-300 focus:bg-white outline-none"
            />
          </form>
        </div>

        {/* ✅ ĐỔI LAYOUT: GRID trái, FILTER phải */}
        <div className="flex gap-10">
          {/* Grid (LEFT) */}
          <div className="flex-1">
            <div className="mb-4 text-sm text-gray-500">
              Found <b className="text-black">{filteredProducts.length}</b> products
            </div>

            <div className="grid gap-x-6 gap-y-12 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p as Product} />
              ))}
            </div>
          </div>

          {/* Sidebar (RIGHT) */}
          <aside className="w-[280px] shrink-0 hidden lg:block">
            {/* ✅ border chuyển sang trái + padding chuyển sang trái */}
            <div className="sticky top-24 space-y-10 border-l pl-8">
              {/* Category */}
              <div>
                <h3 className="text-[15px] font-bold text-black mb-4 border-b pb-2 italic">Category</h3>
                <ul className="space-y-3">
                  <li
                    className={`cursor-pointer text-sm ${
                      !selectedCategory ? "font-bold text-black" : "text-gray-600 hover:text-black"
                    }`}
                    onClick={() => {
                      setSelectedCategory(null);
                      updateUrl({ category: null });
                    }}
                  >
                    All
                  </li>

                  {categories.map((c) => (
                    <li
                      key={c}
                      className={`cursor-pointer text-sm ${
                        selectedCategory === c ? "font-bold text-black" : "text-gray-600 hover:text-black"
                      }`}
                      onClick={() => {
                        const next = selectedCategory === c ? null : c;
                        setSelectedCategory(next);
                        updateUrl({ category: next });
                      }}
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price */}
              <div>
                <h3 className="text-[15px] font-bold text-black mb-4 border-b pb-2 italic">Price</h3>
                <input
                  type="range"
                  min="0"
                  max="200"
                  step="5"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full h-[3px] bg-gray-100 appearance-none cursor-pointer accent-[#C3293E]"
                />
                <p className="mt-3 text-lg font-bold text-[#C3293E]">{priceRange}$</p>
              </div>

              {/* Brand (nếu data có brand thì hiện) */}
              {brands.length > 0 && (
                <div>
                  <h3 className="text-[15px] font-bold text-black mb-4 border-b pb-2 italic">Brand</h3>
                  <ul className="space-y-3">
                    {brands.map((b) => (
                      <li
                        key={b}
                        className={`cursor-pointer text-sm ${
                          selectedBrand === b ? "font-bold text-black" : "text-gray-600 hover:text-black"
                        }`}
                        onClick={() => setSelectedBrand(selectedBrand === b ? null : b)}
                      >
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
