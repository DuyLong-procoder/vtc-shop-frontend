import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AnnouncementBar() {
  return (
    <div className="bg-[#f5e6d3] text-gray-900 py-3">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-left">
          <p className="flex items-center gap-2 text-[16px] font-bold tracking-wide">
            Welcome to our international shop! Enjoy free shipping on orders $100 up.
            <Link
              href="/shop"
              className="text-red-600 font-extrabold inline-flex items-center gap-1 hover:gap-2 transition-all"
            >
              Shop Now
              <ArrowRight className="w-4 h-4" />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
