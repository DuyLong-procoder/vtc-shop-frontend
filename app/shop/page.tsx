// app/shop/page.tsx
import ProductCard from "@/components/product/product-card";
import { products } from "@/data/catalog";
import type { Product } from "@/types";

type SearchParams = { q?: string };

type Props = {
  searchParams?: SearchParams | Promise<SearchParams>;
};

export default async function ShopPage({ searchParams }: Props) {
  // Next 16: searchParams có thể là Promise -> unwrap an toàn
  const sp = await Promise.resolve(searchParams ?? {});
  const qRaw = sp.q ?? "";
  const q = qRaw.trim().toLowerCase();

  const filteredProducts = !q
    ? (products as Product[])
    : (products as any[]).filter((p) => {
        const name = String(p?.name ?? p?.title ?? "").toLowerCase();
        return name.includes(q);
      });

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-black mb-8">Shop</h1>

        {q && (
          <p className="mb-6 text-sm text-gray-600">
            Kết quả cho: <span className="font-semibold text-black">"{qRaw}"</span> —{" "}
            <span className="font-semibold">{filteredProducts.length}</span> sản phẩm
          </p>
        )}

        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center text-gray-600">
            Không tìm thấy sản phẩm phù hợp.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
