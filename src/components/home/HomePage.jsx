import { useDocumentTitle } from "@uidotdev/usehooks";
import Carousel from "../common/Carousel";
import NewArrivals from "../products/NewArrivals";

const HomePage = () => {
  useDocumentTitle("VA SHOP");

  return (
    <div>
      <Carousel />

      <h1 className="text-3xl font-bold text-center pt-10">New Arrivals</h1>
      <NewArrivals />
    </div>
  );
};

export default HomePage;
