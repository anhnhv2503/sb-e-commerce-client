import { useDocumentTitle } from "@uidotdev/usehooks";
import Carousel from "../common/Carousel";
import NewArrivals from "../products/NewArrivals";

const HomePage = () => {
  useDocumentTitle("VA SHOP");

  return (
    <div>
      <Carousel />

      <NewArrivals />
    </div>
  );
};

export default HomePage;
