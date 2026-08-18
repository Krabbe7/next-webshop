import HeroSection from "./components/heroSection/page";
import FeaturedProducts from "./components/featuredProducts/featuredProducts-component";
import WhyPixelvault from "./components/whyPixelValut/whyPixelVault";

export default function Page() {
  return (
    <div>
      <HeroSection />
      <FeaturedProducts />
      <WhyPixelvault />
    </div>
  );
}
