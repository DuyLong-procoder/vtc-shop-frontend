import HeroSection from "@/components/frontpage/section-hero";
import PromoBanners from "@/components/frontpage/section-banners";
import BrowseCategories from "@/components/frontpage/section-categories";
import FeaturedProducts from "@/components/frontpage/section-products";
import HotDeals from "@/components/frontpage/section-deals";
import SocialFeed from "@/components/frontpage/section-social";

export default function HomePage() {
  return (
    <>
      <section className="py-6">
        <div className="container mx-auto px-4 mt-4">
          <div className="grid grid-cols-[260px_85fr_240px] gap-6 items-start">
            <div className="w-[260px]" />

            <div className="relative min-h-[360px] overflow-hidden">
              <HeroSection />
            </div>

            <div className="w-[240px]">
              <PromoBanners />
            </div>
          </div>
        </div>
      </section>

      <BrowseCategories />
      <FeaturedProducts />
      <HotDeals />
      <SocialFeed />
    </>
  );
}
