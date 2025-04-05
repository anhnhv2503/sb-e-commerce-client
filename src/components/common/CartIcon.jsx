import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CartIcon = () => {
  const navigate = useNavigate();
  return (
    <>
      <button
        onClick={() => navigate("/user/cart")}
        className="relative p-2 text-gray-700 hover:text-indigo-600 transition-colors"
        aria-label="Cart"
      >
        <ShoppingBag size={22} />
        <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-indigo-600 flex items-center justify-center text-xs text-white"></span>
      </button>
    </>
  );
};

export default CartIcon;
