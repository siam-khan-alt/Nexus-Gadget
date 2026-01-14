import BrandPartners from "./components/BrandPartners";
import Categories from "./components/Categories";
import FeaturedSpecs from "./components/FeaturedSpecs";
import Hero from "./components/Hero";
import Newsletter from "./components/Newsletter";
import TrendingNow from "./components/TrendingNow";
import UserReviews from "./components/UserReviews";


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Hero />
        <TrendingNow/>
        <Categories/>
        <FeaturedSpecs/>
        <UserReviews/>
        <BrandPartners/>
        <Newsletter/>
      </main>
    </div>
  );
}
