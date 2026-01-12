'use client';

import { useCart } from '@/components/cart/cart-summary';
export default function OrderSummary({ onPlaceOrder }: { onPlaceOrder: () => void }) {
  const { cart } = useCart(); // Lấy dữ liệu giỏ hàng thực tế

  // Tính toán dựa trên dữ liệu thật
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = 7.0; 
  const total = subtotal + shippingFee;

  return (
    <div className="border-[2px] border-[#FDEEEF] p-8 rounded-sm sticky top-6 bg-white">
      <h2 className="text-2xl font-bold mb-8 text-[#1A1C24]">Your order</h2>
      
      <div className="space-y-5">
        <div className="flex justify-between font-bold border-b pb-4 text-sm">
          <span>Product</span>
          <span>Total</span>
        </div>
        
        {/* DANH SÁCH SẢN PHẨM THỰC TẾ TỪ GIỎ HÀNG */}
        <div className="max-h-[250px] overflow-y-auto space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between text-gray-500 text-sm font-medium">
              <span className="max-w-[70%]">{item.name} × {item.quantity}</span>
              <span className="text-black font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          {cart.length === 0 && <p className="text-sm italic">Cart is empty</p>}
        </div>

        <div className="flex justify-between font-bold border-t border-b py-5 text-sm">
          <span>Cart Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-start border-b py-5 text-sm">
          <span className="font-bold">Shipping</span>
          <div className="text-right space-y-2">
            <label className="flex items-center gap-2 justify-end text-gray-500">
              Flat Rate: ${shippingFee.toFixed(2)} <input type="radio" name="shipping" defaultChecked className="accent-[#C3293E]" />
            </label>
          </div>
        </div>

        <div className="flex justify-between font-bold py-6 text-lg">
          <span>Order Total</span>
          <span className="text-xl text-[#C3293E]">${total.toFixed(2)}</span>
        </div>

        <div className="space-y-4 pt-4">
          <div className="border-t pt-4">
            <div className="flex justify-between font-bold italic uppercase text-[12px] tracking-wider text-[#1A1C24]">
              Direct Bank Transfer <span className="text-lg">−</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed mt-3 bg-gray-50 p-3">
              Make your payment directly into our bank account.
            </p>
          </div>
        </div>

       <button
        onClick={onPlaceOrder}
        disabled={cart.length === 0}
        className={`w-full text-white py-4 mt-8 font-bold uppercase tracking-[0.2em] text-[13px] transition-colors rounded-sm ${
          cart.length === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-[#C3293E] hover:bg-black"
        }`}
      >
        Place order
      </button>
      </div>
    </div>
  );
}