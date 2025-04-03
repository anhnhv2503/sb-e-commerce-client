import useCurrencyFormat from "@/components/hooks/useCurrencyFormat";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ProductItem = ({ product }) => {
  const navigate = useNavigate();
  const currency = useCurrencyFormat();
  return (
    <motion.div
      whileHover={{
        y: -10,
        transition: { duration: 0.2 },
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className="overflow-hidden cursor-pointer group h-full"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <div className="overflow-hidden">
          <motion.img
            src={product.images[0].url}
            alt={`${product.name} image`}
            className="h-96 w-full object-cover object-center"
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.4 },
            }}
          />
        </div>
        <CardContent className="p-4">
          <h3 className="text-sm text-gray-700 font-medium">{product.name}</h3>
          <p className="mt-2 text-lg font-bold text-gray-900">
            {currency.format(product.price)}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductItem;
