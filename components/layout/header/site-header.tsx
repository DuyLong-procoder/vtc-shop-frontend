"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  ShoppingCart,
  User,
  Heart,
  ChevronDown,
  LogIn,
  UserPlus,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/navigation";

import { useBasket } from "@/lib/basket/basket-store";
import BasketDrawer from "@/components/basket/basket-drawer";
import { useAuth } from "@/app/providers";

type Lang = "en" | "vi";
type Currency = "USD" | "VND";

const LANG_OPTIONS: { key: Lang; label: string; flagSrc: string }[] = [
  { key: "en", label: "English", flagSrc: "/assets/img/icon/flag-en.png" },
  { key: "vi", label: "Vietnamese", flagSrc: "/assets/img/icon/flag-vi.png" },
];

const CURRENCY_OPTIONS: Currency[] = ["USD", "VND"];

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [lang, setLang] = useState<Lang>("en");
  const [currency, setCurrency] = useState<Currency>("USD");

  const router = useRouter();
  const { isLoggedIn, logout } = useAuth();
  const { getBasketCount } = useBasket();

  const totalItems = getBasketCount();
  const currentLang = LANG_OPTIONS.find((x) => x.key === lang) ?? LANG_OPTIONS[0];

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const keyword = searchQuery.trim();
    if (!keyword) return;
    router.push(`/shop?q=${encodeURIComponent(keyword)}`);
  };

  return (
    <>
      <header className="bg-white border-b relative z-[60]">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-6 py-4">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0" aria-label="Home">
              <Image
                src="/assets/img/logo/logo.png"
                alt="VTC Academy"
                width={180}
                height={60}
                className="object-contain"
                priority
              />
            </Link>

            {/* Search Bar (Enter để search) */}
            <form onSubmit={onSearchSubmit} className="hidden md:flex flex-1 min-w-0">
              <div className="relative w-full max-w-2xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border-0 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-gray-200"
                />
              </div>
            </form>

            {/* Right side */}
            <div className="ml-auto flex items-center gap-4 shrink-0">
              {/* Language + Currency */}
              <div className="hidden lg:flex items-center gap-3">
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <button
                      type="button"
                      className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg bg-white hover:border-gray-300 transition-colors"
                    >
                      <Image
                        src={currentLang.flagSrc}
                        alt={currentLang.label}
                        width={26}
                        height={18}
                        className="rounded-sm"
                      />
                      <span className="text-sm font-semibold text-gray-800">
                        {currentLang.label}
                      </span>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </button>
                  </DropdownMenu.Trigger>

                  <DropdownMenu.Portal>
                    <DropdownMenu.Content
                      sideOffset={8}
                      align="end"
                      className="z-[80] min-w-[180px] bg-white border border-gray-100 shadow-2xl rounded-lg py-2 overflow-hidden"
                    >
                      {LANG_OPTIONS.map((o) => (
                        <DropdownMenu.Item
                          key={o.key}
                          onSelect={(e) => {
                            e.preventDefault();
                            setLang(o.key);
                          }}
                          className="outline-none cursor-pointer flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <Image
                            src={o.flagSrc}
                            alt={o.label}
                            width={24}
                            height={16}
                            className="rounded-sm"
                          />
                          <span className="font-medium">{o.label}</span>
                        </DropdownMenu.Item>
                      ))}
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>

                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <button
                      type="button"
                      className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg bg-white hover:border-gray-300 transition-colors"
                    >
                      <span className="text-sm font-semibold text-gray-800">
                        {currency}
                      </span>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </button>
                  </DropdownMenu.Trigger>

                  <DropdownMenu.Portal>
                    <DropdownMenu.Content
                      sideOffset={8}
                      align="end"
                      className="z-[80] min-w-[120px] bg-white border border-gray-100 shadow-2xl rounded-lg py-2 overflow-hidden"
                    >
                      {CURRENCY_OPTIONS.map((c) => (
                        <DropdownMenu.Item
                          key={c}
                          onSelect={(e) => {
                            e.preventDefault();
                            setCurrency(c);
                          }}
                          className="outline-none cursor-pointer px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 font-medium"
                        >
                          {c}
                        </DropdownMenu.Item>
                      ))}
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
              </div>

              {/* Cart */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative hover:text-[#C3293E] transition-colors"
                aria-label="Open cart"
              >
                <ShoppingCart className="w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#C3293E] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Auth */}
              <div className="relative group">
                {!isLoggedIn ? (
                  <Link
                    href="/auth"
                    className="flex items-center gap-1 hover:text-[#C3293E] transition-colors py-2"
                    aria-label="Account"
                  >
                    <User className="w-6 h-6" />
                    <ChevronDown className="w-4 h-4 text-gray-400 group-hover:rotate-180 transition-transform" />
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="flex items-center gap-1 hover:text-[#C3293E] transition-colors py-2"
                    aria-label="Account menu"
                  >
                    <User className="w-6 h-6 text-[#C3293E]" />
                    <ChevronDown className="w-4 h-4 text-gray-400 group-hover:rotate-180 transition-transform" />
                  </button>
                )}

                <div className="absolute right-0 top-full pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[70]">
                  <div className="bg-white border border-gray-100 shadow-2xl rounded-lg py-2 overflow-hidden">
                    {!isLoggedIn ? (
                      <>
                        <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-50/50">
                          Tài khoản
                        </div>
                        <Link
                          href="/auth"
                          className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-[#C3293E]/5 hover:text-[#C3293E] transition-colors"
                        >
                          <LogIn className="w-4 h-4" />
                          Đăng nhập
                        </Link>
                        <Link
                          href="/auth"
                          className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-[#C3293E]/5 hover:text-[#C3293E] transition-colors"
                        >
                          <UserPlus className="w-4 h-4" />
                          Tạo tài khoản
                        </Link>
                      </>
                    ) : (
                      <>
                        <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-50/50">
                          Xin chào!
                        </div>
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-[#C3293E]/5 hover:text-[#C3293E] transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          Bảng điều khiển
                        </Link>
                        <Link
                          href="/profile"
                          className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-[#C3293E]/5 hover:text-[#C3293E] transition-colors"
                        >
                          <User className="w-4 h-4" />
                          Hồ sơ cá nhân
                        </Link>
                        <hr className="my-1 border-gray-100" />
                        <button
                          type="button"
                          onClick={() => logout?.()}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Đăng xuất
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="relative hover:text-[#C3293E] transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="w-6 h-6" />
                <span className="absolute -top-2 -right-2 bg-[#C3293E] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  0
                </span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <BasketDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
