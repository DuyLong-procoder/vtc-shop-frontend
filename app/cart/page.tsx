'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/components/cart/cart-summary';
import MainHeader from '@/components/layout/header/site-header';

export default function CheckoutCartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  
  // 1. Ép kiểu key của State là string vì id trong input/event thường là string
  const [tempQuantities, setTempQuantities] = useState<{ [key: string]: number }>({});

  const handleInputChange = (id: number | string, value: string) => {
    const val = parseInt(value) || 1;
    setTempQuantities(prev => ({ ...prev, [id.toString()]: val }));
  };

  const handleUpdateCart = (id: number) => {
    // Truy xuất từ state dùng string key
    const newQty = tempQuantities[id.toString()];
    if (newQty) {
      updateQuantity(id, newQty); 
      alert('Đã cập nhật số lượng vào giỏ hàng!');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      
      <main className="container mx-auto px-4 py-16">
        {cart.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed rounded-lg text-gray-400">
            Giỏ hàng trống
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-100">
              <thead>
                <tr className="bg-[#F9F9F9] text-gray-800 text-[14px] font-bold">
                  <th className="py-4 px-6 border border-gray-100 text-center w-32">Images</th>
                  <th className="py-4 px-6 border border-gray-100 text-center">Courses</th>
                  <th className="py-4 px-6 border border-gray-100 text-center">Unit Price</th>
                  <th className="py-4 px-6 border border-gray-100 text-center">Quantity</th>
                  <th className="py-4 px-6 border border-gray-100 text-center">Total</th>
                  <th className="py-4 px-6 border border-gray-100 text-center">Add To Cart</th>
                  <th className="py-4 px-6 border border-gray-100 text-center">Remove</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => {
                  // Chuyển ID sang string một lần để dùng cho đồng nhất
                  const itemIdStr = item.id.toString();
                  const currentTempQty = tempQuantities[itemIdStr];

                  return (
                    <tr key={item.id} className="text-[15px] text-gray-700">
                      <td className="p-4 border border-gray-100">
                        <div className="relative w-20 h-20 mx-auto">
                          <Image 
                            src={item.image || '/assets/img/product/placeholder.png'} 
                            alt={item.name} 
                            fill 
                            className="object-contain" 
                          />
                        </div>
                      </td>

                      <td className="p-4 border border-gray-100 text-center font-medium">
                        {item.name}
                      </td>

                      <td className="p-4 border border-gray-100 text-center">
                        ${item.price.toFixed(0)}
                      </td>

                      <td className="p-4 border border-gray-100">
                        <div className="flex justify-center">
                          <input
                            type="number"
                            min="1"
                            value={currentTempQty !== undefined ? currentTempQty : item.quantity}
                            onChange={(e) => handleInputChange(item.id, e.target.value)}
                            className="w-24 h-12 text-center border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#C12744]"
                          />
                        </div>
                      </td>

                      <td className="p-4 border border-gray-100 text-center font-semibold">
                        ${(item.price * (currentTempQty !== undefined ? currentTempQty : item.quantity)).toFixed(2)}
                      </td>

                      <td className="p-4 border border-gray-100 text-center">
                        <button 
                          onClick={() => handleUpdateCart(item.id)}
                          className="bg-[#C12744] hover:bg-black text-white px-5 py-2.5 rounded text-[13px] font-bold transition-colors uppercase"
                        >
                          Add To Cart
                        </button>
                      </td>

                      <td className="p-4 border border-gray-100 text-center">
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-500 hover:text-red-600 transition-colors"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}