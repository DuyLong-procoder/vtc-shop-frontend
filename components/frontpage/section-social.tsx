import Image from "next/image";
import Link from "next/link";
import { Instagram } from "lucide-react";

export default function InstagramFeed() {
  const instagramImages = [
    { id: 1, image: "/assets/img/instagram/instagram-01.jpg" },
    { id: 2, image: "/assets/img/instagram/instagram-02.jpg" },
    { id: 3, image: "/assets/img/instagram/instagram-03.jpg" },
    { id: 4, image: "/assets/img/instagram/instagram-04.jpg" },
    { id: 5, image: "/assets/img/instagram/instagram-05.jpg" },
    { id: 6, image: "/assets/img/instagram/instagram-06.jpg" },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header giống ảnh bên phải */}
        <div className="text-center mb-12">
          <p className="text-[#C3293E] text-sm font-medium mb-4">Follow On</p>

          <div className="flex items-center justify-center gap-4">
            <Instagram className="w-12 h-12 text-black" />
            <h2 className="text-4xl font-extrabold text-black tracking-tight">
              vtc-academy-shop
            </h2>
          </div>
        </div>

        {/* Grid ảnh */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramImages.map((item) => (
            <Link
              key={item.id}
              href="#"
              className="group relative aspect-square overflow-hidden rounded-lg"
            >
              <Image
                src={item.image}
                alt={`Instagram ${item.id}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Instagram className="w-8 h-8 text-white" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
