import BrandsMarquee from "../features/catalog/BrandsMarquee";
import Categories from "../features/catalog/Categories";
import ProductList from "../features/products/ProductList";

import heroImage1 from "../assets/hero-image-1.jpg";
import heroImage2 from "../assets/hero-image-2.jpg";
import heroImage3 from "../assets/hero-image-3.jpg";
import heroImage4 from "../assets/hero-image-4.jpg";

import Carousel from "./Carousel";

const carouselImages = [heroImage1, heroImage2, heroImage3, heroImage4];

function HomePage() {
  return (
    <div className="HomePage container-md">
      <Carousel initialSlide={2} autoSlide={false}>
        {carouselImages.map((img, i) => (
          <img src={img} alt={`Product Image ${i + 1}`} />
        ))}
      </Carousel>
      <Categories isHomePage={true} />
      <BrandsMarquee />
      <ProductList isHomePage={true} />
    </div>
  );
}

export default HomePage;
