'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Eye, ShoppingCart, GitCompare } from 'lucide-react';
import { Product } from '@/types';
import RatingStars from '@/components/shared/rating-stars';
import { useCart } from '@/components/cart/cart-summary';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();

  return (
    <div 
      className="group relative bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. Khu vực ảnh sản phẩm */}
      <div className="relative aspect-square overflow-hidden bg-[#F6F6F6] rounded-sm">
        <Link href={`/shop-details`} className="block w-full h-full">
          <Image
            src={isHovered && product.hoverImage ? product.hoverImage : product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-contain p-6 transition-transform duration-500 group-hover:scale-110"
          />
        </Link>
        
        {/* THANH ICON NẰM NGANG Ở GIỮA - Hiện khi hover */}
        <div 
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 z-10 ${
            isHovered ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-4'
          }`}
        >
          <div className="flex items-center bg-white shadow-xl rounded-md px-4 py-3 gap-5 border border-gray-100">
            <button 
              onClick={() => addToCart(product)}
              className="text-gray-400 hover:text-[#C3293E] transition-colors"
              title="Add to cart"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
            <button 
              className="text-gray-400 hover:text-[#C3293E] transition-colors" 
              title="Compare"
            >
              <GitCompare className="w-5 h-5" />
            </button>
            <button 
              className="text-gray-400 hover:text-[#C3293E] transition-colors" 
              title="Quick view"
            >
              <Eye className="w-5 h-5" />
            </button>
            <button 
              className="text-gray-400 hover:text-[#C3293E] transition-colors" 
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Nhãn New/Sale góc trái */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-20">
          {product.isNew && (
            <span className="bg-blue-500 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-sm">
              New
            </span>
          )}
          {product.isSale && (
            <span className="bg-[#C3293E] text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-sm">
              Sale
            </span>
          )}
        </div>
      </div>

      {/* 2. Thông tin sản phẩm bên dưới */}
      <div className="py-4 text-left space-y-1">
        <Link href={`/shop-details`}>
          <h3 className="text-sm font-medium text-gray-600 hover:text-[#C3293E] transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>

        {/* Giá tiền */}
        <div className="flex items-center gap-2">
          <span className="text-base font-bold text-black">
            ${product.price.toFixed(2)}
          </span>
          {product.oldPrice && (
            <span className="text-sm text-gray-400 line-through">
              ${product.oldPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}