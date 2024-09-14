import Carousel from "../common/Carousel";
import AllProducts from "../products/AllProducts";

const HomePage = () => {
  return (
    <div>
      <Carousel />

      <h1 className="text-3xl font-bold text-center pt-10">SHOP</h1>

      <AllProducts />
    </div>
  );
};

export default HomePage;
